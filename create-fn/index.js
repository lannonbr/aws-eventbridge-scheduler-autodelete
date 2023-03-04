const {
  SchedulerClient,
  CreateScheduleCommand,
} = require("@aws-sdk/client-scheduler");
const { randomUUID } = require("crypto");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);
require("dotenv").config();

const client = new SchedulerClient({
  region: "us-east-1",
});

async function run() {
  const scheduleName = `ScheduleFromCLI-${randomUUID()}`;

  const timezone = "America/New_York";

  // Trigger schedule two minutes from now
  const twoMinutesFromNow = dayjs()
    .tz(timezone)
    .add(2, "minutes")
    .format("YYYY-MM-DDTHH:mm:ss");

  try {
    await client.send(
      new CreateScheduleCommand({
        Name: scheduleName,

        Target: {
          RoleArn: process.env.ROLE_ARN,
          Arn: process.env.TARGET_ARN,
          Input: JSON.stringify({
            scheduleName,
          }),
        },
        ScheduleExpression: `at(${twoMinutesFromNow})`,
        FlexibleTimeWindow: {
          Mode: "OFF",
        },
        ScheduleExpressionTimezone: timezone,
      })
    );
  } catch (err) {
    console.error(err);
  }
}

run();
