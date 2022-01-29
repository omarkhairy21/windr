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