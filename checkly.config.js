import { defineConfig } from "checkly";
import { Frequency } from "checkly/constructs";

const config = defineConfig({
  projectName: "Website Monitoring",
  logicalId: "website-monitoring-1",
  repoUrl: "https://github.com/LoganPhilbrick/coffeeFinder",
  checks: {
    activated: true,
    muted: false,
    runtimeId: "2022.10",
    frequency: Frequency.EVERY_5M,
    locations: ["us-east-1", "eu-west-1"],
    tags: ["website", "api"],
    checkMatch: "**/__checks__/*.check.js",
    browserChecks: {
      frequency: Frequency.EVERY_10M,
      testMatch: "browsers/**/*.spec.js",
    },
  },
  cli: {
    runLocation: "eu-east-1",
    privateRunLocation: "private-dc1",
  },
});

module.exports = config;
