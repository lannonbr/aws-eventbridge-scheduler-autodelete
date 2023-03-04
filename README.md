# Autodeleting EventBridge Schedules using AWS Lambda Destinations

This is a CDK project based upon the following blogpost by Yan Cui: [The biggest problem with EventBridge Scheduler and how to fix it](https://theburningmonk.com/2023/02/the-biggest-problem-with-eventbridge-scheduler-and-how-to-fix-it/)

## Contents

- `lib` contains the actual CDK Stack
- `functions` contains a sample execution function as well as the function to delete the schedule upon completion
- `create-fn` contains a CLI script to generate a schedule to run the above functions two minutes after being created
