import { Output } from "@pulumi/pulumi";


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