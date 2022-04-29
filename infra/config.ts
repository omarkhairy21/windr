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

// const loadBalancerSettings = [
//     {
//       name: `LoadBalancerType`,
//       namespace: "aws:elasticbeanstalk:environment",
//       value: 'classic',
//     },
//     { 
//       name: 'ListenerProtocol',
//       namespace: "aws:elb:listener:443",
//       value: 'HTTPS',
//     },
//     { 
//       name: 'InstanceProtocol',
//       namespace: "aws:elb:listener:443",
//       value: 'HTTP',
//     },
//     { 
//       name: 'InstancePort',
//       namespace: "aws:elb:listener:443",
//       value: '80',
//     },
//     { 
//       name: 'SSLCertificateId',
//       namespace: "aws:elb:listener:443",
//       value: cert.arn,
//     },
//   ]
  
//   const dbInstanceSettings = [
//     { 
//       name: 'DBEngine',
//       namespace: "aws:rds:dbinstance",
//       value: 'postgres',
//     },
//     { 
//       name: 'HasCoupledDatabase',
//       namespace: "aws:rds:dbinstance",
//       value: 'true',
//     },
//     { 
//       name: 'DBEngineVersion',
//       namespace: "aws:rds:dbinstance",
//       value: '13.4',
//     },
//     { 
//       name: 'DBInstanceClass',
//       namespace: "aws:rds:dbinstance",
//       value: 'db.t4g.micro',
//     },
//     { 
//       name: 'DBUser',
//       namespace: "aws:rds:dbinstance",
//       value: dbUsername
//     },
//     { 
//       name: 'DBPassword',
//       namespace: "aws:rds:dbinstance",
//       value: dbPassword,
//     },
//     { 
//       name: 'DBDeletionPolicy',
//       namespace: "aws:rds:dbinstance",
//       value: 'Snapshot',
//     },
// ]