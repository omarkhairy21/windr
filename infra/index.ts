import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Default VPC 
const defaultVPC = awsx.ec2.Vpc.getDefault()
const publicSubnetIds = Promise.resolve(defaultVPC.publicSubnetIds)
const test = '172.31.16.0/20'
console.log(publicSubnetIds)

// Create instance profile 
const instanceProfileRole = new aws.iam.Role("windr-api-eb", {
  name: "windr-api-eb",
  description: 'Elastic Beanstalk Role for the Windr API',
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Sid: "",
        Action: "sts:AssumeRole",
        Principal: {
          Service: "elasticbeanstalk.amazonaws.com"
        },
      }],
    }
})

const instanceProfile = new aws.iam.InstanceProfile("instanceProfile", {
    role: instanceProfileRole.name
})


// Create new RDS Instance of Postgres Database

// Create new S3 Bucket for deployment
const ebAppDeployBucket = new aws.s3.Bucket("windr-deployment", {})

const ebAppDeployObject = new aws.s3.BucketObject("windr-deployment-object", {
    bucket: ebAppDeployBucket.id,
    key: "windr.zip",
    source: "../windr.zip",
});

// Create new S3 Bucket for uploads

// Create new ElasticBeanstalk Application
const app = new aws.elasticbeanstalk.Application("windr", {
  name: "windr-api",
});

const defaultAppVersion = new aws.elasticbeanstalk.ApplicationVersion("default", {
  application: app,
  bucket: ebAppDeployBucket.id,
  description: "Windr API V 0.1",
  key: ebAppDeployObject.id,
});

// Crete new ElasticBeanstalk Environment
const productionEnvironment = new aws.elasticbeanstalk.Environment("windr-api-production", {
  application: app,
  version: defaultAppVersion,
  solutionStackName: '64bit Amazon Linux 2 v5.4.9 running Node.js 14',
  tier: 'WebServer',
  settings: [
    // {
    //   name: 'VPCId',
    //   namespace: 'aws:ec2:vpc',
    //   value: defaultVPC.id,
    // },
    // {
    //   name: 'Subnets',
    //   namespace: 'aws:ec2:vpc',
    //   value: test,
    // },
    
    {
      name: "IamInstanceProfile",
      namespace: "aws:autoscaling:launchconfiguration",
      value: instanceProfile.name,
    },
  ]
})

export const endPointUrl = productionEnvironment.endpointUrl;