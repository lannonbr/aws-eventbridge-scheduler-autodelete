const { Stack } = require("aws-cdk-lib");
const { Function, Runtime, Code } = require("aws-cdk-lib/aws-lambda");
const { LambdaDestination } = require("aws-cdk-lib/aws-lambda-destinations");
const {
  PolicyStatement,
  Role,
  ServicePrincipal,
  PolicyDocument,
  Effect,
} = require("aws-cdk-lib/aws-iam");
const path = require("path");

class AwsEventbridgeSchedulerAutodeleteStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const deleteScheduleStatement = new PolicyStatement({
      actions: ["scheduler:DeleteSchedule"],
      resources: ["*"],
    });

    const autoDeleteFunction = new Function(
      this,
      "AutoDeleteScheduleFunction",
      {
        code: Code.fromAsset(
          path.join(__dirname, "..", "functions", "auto-delete")
        ),
        handler: "index.handler",
        runtime: Runtime.NODEJS_18_X,
      }
    );

    autoDeleteFunction.addToRolePolicy(deleteScheduleStatement);

    const executeFn = new Function(this, "ExecuteFunction", {
      code: Code.fromAsset(path.join(__dirname, "..", "functions", "execute")),
      handler: "index.handler",
      runtime: Runtime.NODEJS_18_X,
      onSuccess: new LambdaDestination(autoDeleteFunction),
    });

    const scheduleRole = new Role(this, "ScheduleRole", {
      assumedBy: new ServicePrincipal("scheduler.amazonaws.com"),
    });
    scheduleRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["lambda:invokeFunction"],
        resources: ["*"],
      })
    );
  }
}

module.exports = { AwsEventbridgeSchedulerAutodeleteStack };
