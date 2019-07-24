import sinon from 'sinon';
import fs from 'fs';
import runScript from '../../app/utils/gogenUtils';
import defaultAnalysisOptions from '../../app/constants/defaultAnalysisOptions';

jest.mock('fs');

describe('runScript', () => {
  const sandbox = sinon.createSandbox();

  function setup() {
    const fakeCreateJsonFile = sandbox.spy();
    const fakeGogenCallbackFunction = sandbox.spy();

    return {
      fakeCreateJsonFile,
      fakeGogenCallbackFunction
    };
  }

  afterEach(() => {
    sandbox.restore();
  });

  it('calls child process with values from state', () => {
    const state = {
      ...defaultAnalysisOptions,
      dateTime: 'date',
      county: { name: 'Sacramento', code: 'SACRAMENTO' },
      outputFilePath: 'outputPath/outputPath'
    };

    const { fakeCreateJsonFile, fakeGogenCallbackFunction } = setup();

    runScript(state, fakeCreateJsonFile, fakeGogenCallbackFunction);

    const { args } = fakeCreateJsonFile.getCall(0);
    expect(args[0]).toEqual({ eligible: true });
    expect(args[1]).toEqual(
      'outputPath/outputPath/eligibilityConfig_date.json'
    );

    expect(fs.existsSync.mock.calls.length).toEqual(1);
  });
});
