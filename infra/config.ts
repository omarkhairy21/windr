const AWSEbsWebTierPolicy =  [
    {
        "Sid": "BucketAccess",
        "Action": [
            "s3:Get*",
            "s3:List*",
            "s3:PutObject"
        ],
        "Effect": "Allow",
        "Resource": [
            "arn:aws:s3:::elasticbeanstalk-*",
            "arn:aws:s3:::elasticbeanstalk-*/*"
        ]
    },
    {
        "Sid": "XRayAccess",
        "Action": [
            "xray:PutTraceSegments",
            "xray:PutTelemetryRecords",
            "xray:GetSamplingRules",
            "xray:GetSamplingTargets",
            "xray:GetSamplingStatisticSummaries"
        ],
        "Effect": "Allow",
        "Resource": "*"
    },
    {
        "Sid": "CloudWatchLogsAccess",
        "Action": [
            "logs:PutLogEvents",
            "logs:CreateLogStream",
            "logs:DescribeLogStreams",
            "logs:DescribeLogGroups"
        ],
        "Effect": "Allow",
        "Resource": [
            "arn:aws:logs:*:*:log-group:/aws/elasticbeanstalk*"
        ]
    },
    {
        "Sid": "ElasticBeanstalkHealthAccess",
        "Action": [
            "elasticbeanstalk:PutInstanceStatistics"
        ],
        "Effect": "Allow",
        "Resource": [
            "arn:aws:elasticbeanstalk:*:*:application/*",
            "arn:aws:elasticbeanstalk:*:*:environment/*"
        ]
    }
]

const AWSEbsWorkerTierPolicy = [
    {
        "Sid": "MetricsAccess",
        "Action": [
            "cloudwatch:PutMetricData"
        ],
        "Effect": "Allow",
        "Resource": "*"
    },
    {
        "Sid": "XRayAccess",
        "Action": [
            "xray:PutTraceSegments",
            "xray:PutTelemetryRecords",
            "xray:GetSamplingRules",
            "xray:GetSamplingTargets",
            "xray:GetSamplingStatisticSummaries"
        ],
        "Effect": "Allow",
        "Resource": "*"
    },
    {
        "Sid": "QueueAccess",
        "Action": [
            "sqs:ChangeMessageVisibility",
            "sqs:DeleteMessage",
            "sqs:ReceiveMessage",
            "sqs:SendMessage"
        ],
        "Effect": "Allow",
        "Resource": "*"
    },
    {
        "Sid": "BucketAccess",
        "Action": [
            "s3:Get*",
            "s3:List*",
            "s3:PutObject"
        ],
        "Effect": "Allow",
        "Resource": [
            "arn:aws:s3:::elasticbeanstalk-*",
            "arn:aws:s3:::elasticbeanstalk-*/*"
        ]
    },
    {
        "Sid": "DynamoPeriodicTasks",
        "Action": [
            "dynamodb:BatchGetItem",
            "dynamodb:BatchWriteItem",
            "dynamodb:DeleteItem",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:UpdateItem"
        ],
        "Effect": "Allow",
        "Resource": [
            "arn:aws:dynamodb:*:*:table/*-stack-AWSEBWorkerCronLeaderRegistry*"
        ]
    },
    {
        "Sid": "CloudWatchLogsAccess",
        "Action": [
            "logs:PutLogEvents",
            "logs:CreateLogStream"
        ],
        "Effect": "Allow",
        "Resource": [
            "arn:aws:logs:*:*:log-group:/aws/elasticbeanstalk*"
        ]
    },
    {
        "Sid": "ElasticBeanstalkHealthAccess",
        "Action": [
            "elasticbeanstalk:PutInstanceStatistics"
        ],
        "Effect": "Allow",
        "Resource": [
            "arn:aws:elasticbeanstalk:*:*:application/*",
            "arn:aws:elasticbeanstalk:*:*:environment/*"
        ]
    }
]


const AWSEbsMultiContainerDockerPolicy = [
    {
        "Sid": "ECSAccess",
        "Effect": "Allow",
        "Action": [
            "ecs:Poll",
            "ecs:StartTask",
            "ecs:StopTask",
            "ecs:DiscoverPollEndpoint",
            "ecs:StartTelemetrySession",
            "ecs:RegisterContainerInstance",
            "ecs:DeregisterContainerInstance",
            "ecs:DescribeContainerInstances",
            "ecs:Submit*",
            "ecs:DescribeTasks"
        ],
        "Resource": "*"
    }
]

const AWSEC2ContainerRegistryReadOnlyPolicy = [
    {
        "Effect": "Allow",
        "Action": [
            "ecr:GetAuthorizationToken",
            "ecr:BatchCheckLayerAvailability",
            "ecr:GetDownloadUrlForLayer",
            "ecr:GetRepositoryPolicy",
            "ecr:DescribeRepositories",
            "ecr:ListImages",
            "ecr:DescribeImages",
            "ecr:BatchGetImage",
            "ecr:GetLifecyclePolicy",
            "ecr:GetLifecyclePolicyPreview",
            "ecr:ListTagsForResource",
            "ecr:DescribeImageScanFindings"
        ],
        "Resource": "*"
    }
]