#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/cdk-stack";

const app = new cdk.App();

new CdkStack(app, "VasFrontend-lab", {
  env: {
    account: "730335193650",
    region: "us-east-1",
  },
  appDomain: "vikeandsell.ca",
  frontendDomain: "lab.vikeandsell.ca",
  stage: "lab",
});

new CdkStack(app, "VasFrontend-prod", {
  env: {
    account: "730335193650",
    region: "us-east-1",
  },
  appDomain: "vikeandsell.ca",
  frontendDomain: "www.vikeandsell.ca",
  stage: "prod",
});
