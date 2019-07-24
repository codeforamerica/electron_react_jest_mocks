// @flow
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import PageContainer from './PageContainer';
import ResultsFormCard from './ResultsFormCard';
import defaultAnalysisOptions from '../constants/defaultAnalysisOptions';
import IntroductionFormCard from './IntroductionFormCard';
import openFolder from '../utils/osHelpers';
import runScript from '../utils/gogenUtils';
import { createJsonFile, getDateTime } from '../utils/fileUtils';

type State = {
  dateTime: string,
  currentScreen: number,
  county: County,
  outputPathPrefix: string,
  outputFilePath: string
};

type Props = {};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let home: string;

    if (process.env.HOME != null) {
      home = process.env.HOME;
    } else {
      home = '';
      if (!process.env.IS_PACKAGED) {
        throw new Error('Home directory is null');
      }
    }

    this.state = {
      dateTime: '',
      outputPathPrefix: `${home}/Desktop/Jest_Mocks_Example_output/CMR_output`,
      outputFilePath: '',
      ...defaultAnalysisOptions
    };
  }

  resetOutputPath = () => {
    const { outputPathPrefix } = this.state;
    this.setState({
      outputFilePath: outputPathPrefix
    });
  };

  nextScreen = () => {
    const { currentScreen } = this.state;
    this.setState({ currentScreen: currentScreen + 1 });
  };

  resetInitialState = () => {
    this.setState(defaultAnalysisOptions);
  };

  runScriptInOptions = () => {
    const { outputPathPrefix } = this.state;

    const date = getDateTime();
    const newOutputFilePath = `${outputPathPrefix}_${date}`;

    this.setState(
      {
        dateTime: date,
        outputFilePath: newOutputFilePath
      },
      () => runScript(this.state, createJsonFile, this.nextScreen)
    );
  };

  render() {
    const { currentScreen, county, outputFilePath } = this.state;
    return (
      <PageContainer currentScreen={currentScreen}>
        <IntroductionFormCard onBegin={this.runScriptInOptions} />
        <ResultsFormCard
          county={county}
          outputFolder={outputFilePath}
          openFolder={openFolder}
          onStartOver={this.resetInitialState}
          resetOutputPath={this.resetOutputPath}
        />
      </PageContainer>
    );
  }
}
