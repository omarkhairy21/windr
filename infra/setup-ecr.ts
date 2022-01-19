import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { ECRFullAccessPolicy } from './config';

// Create Github-Actions Roles to push to ECR

const user = new aws.iam.User("Github-Actions-Allow-Manage-ECR", {
  name: "Github-Actions-Allow-Manage-ECR",
})

const  policy = new aws.iam.Policy("Github-Actions-Allow-Manage-ECR-Policy", {
  path: "/",
  name: "Github-Actions-Allow-Manage-ECR-Policy",
  policy: ECRFullAccessPolicy
})

const attachPolicy = new aws.iam.UserPolicyAttachment("Github-Actions-Allow-Manage-ECR-Policy-Attachment", {
  user: user.name,
  policyArn: policy.arn
})

const userCredentials = new aws.iam.AccessKey("Github-Actions-Allow-Manage-ECR-AccessKey", {
  user: user.name,
})

// Create ECR Repository
const repository = new aws.ecr.Repository("windr-api-test", {
  name: "windr-api-test",
})

export const AccessKey = userCredentials.id;
export const SecretKey = userCredentials.secret;
export const ECRRepository = repository.repositoryUrl;