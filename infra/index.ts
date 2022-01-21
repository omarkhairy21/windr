import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

import { AccessKey as SetupECRAccessKey,  SecretKey as SetupECRSecretKey } from './setup-ecr';

const config = new pulumi.Config();
const appName = config.require("appName");
const appEnvironment = config.require("appEnvironment");

/* 
  1- Elastic Beanstalk service role
     https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts-roles-service.html
  
  2- Elastic Beanstalk instance profile
     https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts-roles-instance.html

  3- Managing Elastic Beanstalk service roles
      https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/iam-servicerole.html

  4- Service roles, instance profiles, and user policies
    https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts-roles.html

  Use Docker image from ECR repository
  https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker.container.console.html

  we need to give access to ec2 instance role to read the image from ECR repository
  */
// (1) S3
export const bucket = new aws.s3.Bucket("my-bucket");

// (2) ECR
export const ecr = new aws.ecr.Repository(`${appName}`, {
  name: `${appName}`
});

// (3-1) Setup IamInstanceProfile
export const instanceProfileRole = new aws.iam.Role(`${appName}-eb-ec2-role`, {
  name: `${appName}-eb-ec2-role`,
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

