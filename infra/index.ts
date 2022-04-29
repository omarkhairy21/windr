import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { getEBConfig } from "./config";

const region = pulumi.output(aws.getRegion().then(data => data.name));
const accountId = pulumi.output(aws.getCallerIdentity().then(data => data.accountId));
const appName = 'windr'
const dbUsername = 'postgres'
const dbPassword = 'postgres'

const vpc = awsx.ec2.Vpc.getDefault();
const subnetsIDs = pulumi.interpolate `${vpc.publicSubnetIds}`;

// (2) ECR
const ecr = new aws.ecr.Repository(`${appName}`, {
  name: `${appName}`,
  tags: {
    Name: 'windr-ebs-deployment-production',
  },
})

const imageUrl = pulumi.interpolate `${accountId}.dkr.ecr.${region}.amazonaws.com/${ecr.name}:latest`


// (1) S3
  const deploymentBucket = new aws.s3.Bucket("windr-ebs-deployment", {})
  const deploymentObject = pulumi.all([imageUrl]).apply(([imageUrl]) => {
    const json = JSON.stringify(getEBConfig(imageUrl));
    return new aws.s3.BucketObject("windr-ebs-deployment-object", {
      bucket: deploymentBucket.id,
      key: "Dockerrun.aws.json",
      contentType: "application/json",
      source: new pulumi.asset.StringAsset(json),
    })

  })

 const uploadsBucket = new aws.s3.Bucket("windr-ebs-uploads", {
    acl: "private",
    forceDestroy: false,
  });

const elbBucketLogs = new aws.s3.Bucket("windr-ebs-elb-bucket-logs", {
  acl: 'log-delivery-write',
})

// (3-1) Setup IamInstanceProfile
const instanceProfileRole = new aws.iam.Role(`${appName}-ebs-ec2-role`, {
  name: `${appName}-ebs-ec2-role`,
  description: "Role for EC2 managed by EB",
  assumeRolePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Action: "sts:AssumeRole",
        Principal: {
          Service: "ec2.amazonaws.com"
        },
        Effect: "Allow",
        Sid: ""
      }
    ]
  })
});

new aws.iam.RolePolicyAttachment('windr-AmazonEC2ContainerRegistryReadOnly', {
  role: instanceProfileRole,
  policyArn: 'arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly',
})
new aws.iam.RolePolicyAttachment('windr-AWSElasticBeanstalkWorkerTier', {
  role: instanceProfileRole,
  policyArn: 'arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier',
})

new aws.iam.RolePolicyAttachment('windr-AWSElasticBeanstalkWebTier', {
  role: instanceProfileRole,
  policyArn: 'arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier',
})

new aws.iam.RolePolicyAttachment('windr-AWSElasticBeanstalkMulticontainerDocker', {
  role: instanceProfileRole,
  policyArn: 'arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker',
})

const instanceProfile = new aws.iam.InstanceProfile(`${appName}-ebs-instance-profile`, {
  name: `${appName}-ebs-instance-profile`,
  role: instanceProfileRole.id,

})

const user = new aws.iam.User("windr-user", {
  name: "windr-user-allow-manage-s3-upload",
  tags: {"Name": "windr-user-allow-manage-s3-upload"}
})

const userCredentials = new aws.iam.AccessKey("windr-user-access-key", {
  user: user.name,
})

const userPolicy = new aws.iam.UserPolicy("windr-user-policy", {
  user: user.name,
  policy: JSON.stringify(
    {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "s3:*",
                  "s3-object-lambda:*"
              ],
              "Resource": "*"
          }
      ]
  })
})

// 4 Create new PostgresDb instance
const db = new aws.rds.Instance(`${appName}-db`, {
  engine: "postgres",
  engineVersion: "13.4",
  instanceClass: "db.t4g.micro",
  allocatedStorage: 10,
  username: "postgres",
  password: "postgres",
  tags: {
    Name: `${appName}-db-v4`,
  },
  finalSnapshotIdentifier: `${appName}-db-snapshot`,
  skipFinalSnapshot: true,
  name: `${appName}`,
});

// 5 Create new Elastic Beanstalk Application
const ebApp = new aws.elasticbeanstalk.Application(`${appName}-production`, {
  name: `${appName}-production`,
  description: "Production Application for Windr",
});

const appVersion = new aws.elasticbeanstalk.ApplicationVersion('V6.1', {
  application: ebApp.name,
  description: "Version 6.1",
  bucket: deploymentBucket.id,
  key: deploymentObject.key,
});


// Cetificate
const cert = pulumi.output(
  aws.acm.getCertificate({
    domain: `api.windr.co`,
  })
)

const loadBalancerSettings = [
  {
    name: `LoadBalancerType`,
    namespace: "aws:elasticbeanstalk:environment",
    value: 'classic',
  },
  { 
    name: 'ListenerProtocol',
    namespace: "aws:elb:listener:443",
    value: 'HTTPS',
  },
  { 
    name: 'InstanceProtocol',
    namespace: "aws:elb:listener:443",
    value: 'HTTP',
  },
  { 
    name: 'InstancePort',
    namespace: "aws:elb:listener:443",
    value: '80',
  },
  { 
    name: 'SSLCertificateId',
    namespace: "aws:elb:listener:443",
    value: cert.arn,
  },
]

const dbInstanceSettings = [
  { 
    name: 'DBEngine',
    namespace: "aws:rds:dbinstance",
    value: 'postgres',
  },
  { 
    name: 'HasCoupledDatabase',
    namespace: "aws:rds:dbinstance",
    value: 'true',
  },
  { 
    name: 'DBEngineVersion',
    namespace: "aws:rds:dbinstance",
    value: '13.4',
  },
  { 
    name: 'DBInstanceClass',
    namespace: "aws:rds:dbinstance",
    value: 'db.t4g.micro',
  },
  { 
    name: 'DBUser',
    namespace: "aws:rds:dbinstance",
    value: dbUsername
  },
  { 
    name: 'DBPassword',
    namespace: "aws:rds:dbinstance",
    value: dbPassword,
  },
  { 
    name: 'DBDeletionPolicy',
    namespace: "aws:rds:dbinstance",
    value: 'Snapshot',
  },
]

const otherSettings = [
  {
    name: "IamInstanceProfile",
    namespace: "aws:autoscaling:launchconfiguration",
    value: instanceProfile.id,
  },
  {
    name: `NODE_ENV`,
    namespace: "aws:elasticbeanstalk:application:environment",
    value: 'production',
  },
  {
    name: `AWS_ACCESS_KEY_ID`,
    namespace: "aws:elasticbeanstalk:application:environment",
    value: userCredentials.id,
  },
  {
    name: `AWS_ACCESS_SECRET`,
    namespace: "aws:elasticbeanstalk:application:environment",
    value: userCredentials.secret,
  },
  {
    name: `AWS_S3_BUCKET_NAME`,
    namespace: "aws:elasticbeanstalk:application:environment",
    value: uploadsBucket.id,
  },
  {
    name: `AWS_Region`,
    namespace: "aws:elasticbeanstalk:application:environment",
    value: region,
  }
]
// 6 Create new Elastic Beanstalk Environment
// General Options https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html
const ebEnv = new aws.elasticbeanstalk.Environment(`${appName}-production`, {
  application: ebApp.name,
  version: appVersion,
  solutionStackName: "64bit Amazon Linux 2 v3.4.10 running Docker",
  tier: 'WebServer',
  cnamePrefix: `${appName}-production`,
  settings: [
    ...loadBalancerSettings,
    ...dbInstanceSettings,
    ...otherSettings,
  ]
});


export const endpoint = ebEnv.endpointUrl