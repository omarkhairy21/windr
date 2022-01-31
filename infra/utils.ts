// const loadBalancer = new awsx.ebs.LoadBalancer('windr-lb', {})

// Default vpc and subnets
// const defaultDefaultVpc = new aws.ec2.DefaultVpc("default-vpc", {
//   tags: {
//       Name: "Default VPC",
//   },
// });

// new aws.iam.User('Github-Actions-Allow-Manage-ECR')
// aws.iam.getPolicy({
//   name: 'Github-Actions-Allow-Manage-ECR-Policy'
// })

// const loadBalancer = new aws.lb.LoadBalancer(`${appName}-elb`, {
//   name: `${appName}-elb`,
//   loadBalancerType: "application",
//   tags: {
//     Environment: "production",
//     Name: `${appName}-elb`
//   },
// })

// const listener = new aws.lb.Listener(`${appName}-elb-listener`, {
//   loadBalancerArn: loadBalancer.arn,
//   port: 443,
//   protocol: "HTTPS",
//   sslPolicy: "ELBSecurityPolicy-2016-08",
//   certificateArn: aws.acm.Certificate.get(`${appName}-elb-cert`, {}).arn,
//   defaultActions: [
//     {
//       type: "forward",

//     }
//   ]
// })



// const { dbUsername, dbPassword } = pulumi.all([db.username, db.password])
//   .apply(([dbUsername, dbPassword]) => ({dbUsername, dbPassword: dbPassword || '' }))

export const getEBConfig = (imageUrl: string) => ({
  AWSEBDockerrunVersion: '1',
  Image: {
    Name : imageUrl,
    Update: "true"
  },
  Ports: [
    {
      ContainerPort: "1337"
    }
  ]
})