# Windr

<div style='display:flex;align-items;center;justify-content:center;'>
    <img src="./assets/logo.svg" alt="drawing" style="width:200px;"/>
</div>

# What is widnr.co?!

Windr was starting as side project (side hustle), basically it likes medium.com or hashnode.com, it helps the users to create and publish static websites in seconds(10 seconds) withing sub-domain like example.windr.co or using custom domain like `khairy.me`

## What are the system requirements?

- docker
- or Node.JS (V14), postgresSQL and yarn.

## How to run this project locally?

1- Add `.env.local` in `app`, check out the `example.env` for required environments variables
2- Add `.env` in `api` check out the `example.env` for required environments variables
3- run `docker-compose up`

## Folder structure and Technologies used

1- `infra` responsible for provisioning the backend infrastructure with pulumi(TypeScript) as IaC (infrastructure as code), the resources consumed by pulumi are:

- AWS IAM
- AWS S3
- Route 53
- AWS Elastic Container Registry (ECR)
- AWS Relational Database (RDS) PostgresSql
- AWS Elastic Load Balancer (Classic)

2- `app` (Frontend), Deployed in Vercel.

- Next.JS (v12)
- ChakraUI
- TypeScript
- NextAuth
- TipTap
- SWR

3- `api` Server, Deployed in AWs

- Strapi(v3.68)
- PostgresSQL

## Overview of request life cycle

> Note: the diagram missing resource Elastic Container Registry (ECR) and S3 Bucket which they are used to deploy new docker image in Elastic Beanstalk

![Request Life Cycle](/assets/request-life-cycle.png "Request Life Cycle")
