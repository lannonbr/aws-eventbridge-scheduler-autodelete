# Autodeleting EventBridge Schedules using AWS Lambda Destinations

This is a CDK project based upon the following blogpost by Yan Cui: [The biggest problem with EventBridge Scheduler and how to fix it](https://theburningmonk.com/2023/02/the-biggest-problem-with-eventbridge-scheduler-and-how-to-fix-it/)

## Contents

- `lib` contains the actual CDK Stack
- `functions` contains a sample execution function as well as the function to delete the schedule upon completion
- `create-fn` contains a CLI script to generate a schedule to run the above functions two minutes after being created

## Setup

First, deploy the main AWS resources defined in `lib`.

```
npm install
npm run cdk deploy
```

Either use the AWS SDK or Web Console to grab the ARNs for both the Schedule Role and lambda function. Place them in a `.env` file within the `create-fn` folder as `ROLE_ARN` and `TARGET_ARN` respectively.

Then enter the `create-fn` folder and run `index.js`. If you open the console to the schedules you should see the schedule you just created and then two minutes later when it triggers the lambda function it should shortly after be deleted if the lambda function exits successfully.
