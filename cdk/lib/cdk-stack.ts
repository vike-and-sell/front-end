import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
  AllowedMethods,
  Distribution,
  OriginAccessIdentity,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { CanonicalUserPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export interface CdkStackProps extends StackProps {
  appDomain: string;
  frontendDomain: string;
  stage: string;
}

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props: CdkStackProps) {
    super(scope, id, props);

    const zone = HostedZone.fromLookup(this, `VasHostedZone-${props.stage}`, {
      domainName: props.appDomain,
    });
    const cloudfrontOAI = new OriginAccessIdentity(
      this,
      `cloudfront-OAI-Vas-${props.stage}`,
      {
        comment: `OAI for ${id}`,
      }
    );

    const bucket = new Bucket(this, `VasSiteBucket-${props.stage}`, {
      bucketName: props.frontendDomain,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    bucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [bucket.arnForObjects("*")],
        principals: [
          new CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const certificate = new Certificate(
      this,
      `VasSiteCertificate-${props.stage}`,
      {
        domainName: props.frontendDomain,
        validation: CertificateValidation.fromDns(zone),
      }
    );

    const distribution = new Distribution(
      this,
      `VasSiteDistribution-${props.stage}`,
      {
        certificate,
        defaultRootObject: "index.html",
        domainNames: [props.frontendDomain],
        minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 403,
            responsePagePath: "/index.html",
          },
        ],
        defaultBehavior: {
          origin: new S3Origin(bucket, {
            originAccessIdentity: cloudfrontOAI,
          }),
          compress: true,
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      }
    );

    new ARecord(this, `VasSiteAliasRecord-${props.stage}`, {
      recordName: props.frontendDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone,
    });

    new BucketDeployment(this, `VasBucketDeployment-${props.stage}`, {
      sources: [Source.asset("../dist")],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
