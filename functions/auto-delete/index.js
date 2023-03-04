const {
  SchedulerClient,
  DeleteScheduleCommand,
} = require("@aws-sdk/client-scheduler");
const client = new SchedulerClient({ region: "us-east-1" });

exports.handler = async function (event) {
  const scheduleName = event.requestPayload.scheduleName;

  await client.send(
    new DeleteScheduleCommand({
      Name: scheduleName,
    })
  );
};
