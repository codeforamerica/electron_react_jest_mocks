/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';

export default function runScript(
  state,
  createJsonFile,
  childFinishedCallback: function
) {
  const { dateTime, baselineEligibilityOptions, outputFilePath } = state;

  if (!fs.existsSync(outputFilePath)) {
    fs.mkdirSync(outputFilePath, { recursive: true }, err => {
      if (err) throw err;
      console.log('error making path:', path);
    });
  }
  const JsonFileName = `eligibilityConfig_${dateTime}.json`;
  const pathToEligibilityOptions = path.join(outputFilePath, JsonFileName);

  createJsonFile(baselineEligibilityOptions, pathToEligibilityOptions);
  childFinishedCallback();
}
