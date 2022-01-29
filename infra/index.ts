import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { getEBConfig } from "./utils";

const region = pulumi.output(aws.getRegion().then(data => data.name));
const accountId = pulumi.output(aws.getCallerIdentity().then(data => data.accountId));
const appName = 'windr'

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
  name: `${appName}-db`,
});

const { dbUsername, dbPassword } = pulumi.all([db.username, db.password])
  .apply(([dbUsername, dbPassword]) => ({dbUsername, dbPassword: dbPassword || '' }))

// 5 Create new Elastic Beanstalk Application
const ebApp = new aws.elasticbeanstalk.Application(`${appName}-ebs-app`, {
  name: `${appName}-ebs-app`,
  description: "Production Application for Windr",
});

const appVersion = new aws.elasticbeanstalk.ApplicationVersion('V3.0', {
  application: ebApp.name,
  description: "Version 3.0",
  bucket: deploymentBucket.id,
  key: deploymentObject.key,
});

// 6 Create new Elastic Beanstalk Environment
const ebEnv = new aws.elasticbeanstalk.Environment(`${appName}-production`, {
  application: ebApp.name,
  version: appVersion,
  solutionStackName: "64bit Amazon Linux 2 v3.4.10 running Docker",
  settings: [
    {
      name: "IamInstanceProfile",
      namespace: "aws:autoscaling:launchconfiguration",
      value: instanceProfile.id,
    },
    {
      name: `DATABASE_USERNAME`,
      namespace: "aws:elasticbeanstalk:application:environment",
      value: dbUsername,
    },
    {
      name: `DATABASE_PASSWORD`,
      namespace: "aws:elasticbeanstalk:application:environment",
      value: dbPassword,
    },
    {
      name: `DATABASE_NAME`,
      namespace: "aws:elasticbeanstalk:application:environment",
      value: db.name,
    },
    {
      name: `DATABASE_HOST`,
      namespace: "aws:elasticbeanstalk:application:environment",
      value: db.endpoint,
    },
    {
      name: `DATABASE_PORT`,
      namespace: "aws:elasticbeanstalk:application:environment",
      value: '5432',
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
});

export const endpoint = ebEnv.endpointUrl