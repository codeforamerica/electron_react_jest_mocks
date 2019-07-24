// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import StartOverButton from './StartOverButton';
import styles from './ResultsFormCard.css';
import EmojiMediaBox from './EmojiMediaBox';

type Props = {
  county: County,
  outputFolder: string,
  openFolder: string => void,
  onStartOver: void => void,
  resetOutputPath: void => void
};

export default class ResultsFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  openResultsFolder = () => {
    const { openFolder, outputFolder } = this.props;
    openFolder(outputFolder);
  };

  onClickStartOver = () => {
    const { onStartOver, resetOutputPath } = this.props;
    resetOutputPath();
    onStartOver();
  };

  render() {
    const { county } = this.props;
    return (
      <FormCard>
        <FormCardHeader>
          <div className="text--centered">
            <div className={styles.completedIcon} />
            <h2 className={`${styles.resultsHeader} nudge--med`}>
              Your files are ready!
            </h2>
            <p
              className={styles.resultsSubheader}
            >{`We have generated results for ${county.name} County`}</p>
            <button
              className="button button--primary"
              type="button"
              id="view_results"
              onClick={this.openResultsFolder}
            >
              Open Folder
            </button>
          </div>
        </FormCardHeader>
        <FormCardContent>
          <h3 className="text--centered">
            <p>What&apos;s included in the folder:</p>
          </h3>
          <EmojiMediaBox
            className={styles.sidePadding}
            emojiClass="emoji--page-facing-up"
            title="Eligibility Config File"
            content="JSON file containing simple default eligibility information."
          />
        </FormCardContent>
        <FormCardFooter>
          <div className="text--centered">
            <StartOverButton onStartOver={this.onClickStartOver} />
          </div>
        </FormCardFooter>
      </FormCard>
    );
  }
}
