// @flow
import React, { Component } from 'react';
import FormCard, { FormCardContent, FormCardFooter } from './FormCard';
import styles from './IntroductionFormCard.css';

type Props = {
  onBegin: () => void
};

export default class CountySelectFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { onBegin } = this.props;
    return (
      <FormCard>
        <FormCardContent>
          <div className="text--centered">
            <h1 className={styles.introductionTitle}>
              This is a test app that will write some basic eligibility criteria
              to a file.
            </h1>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Here's what you need to do:</p>
            <div className="vertical-steps">
              <div className="vertical-steps__step">
                <div className="emoji emoji--big emoji--page-facing-up" />
                <h2 className={styles.stepTitle}>Click the button</h2>
                <p className={styles.stepBody}>
                  Click on the button below to write the file.
                </p>
              </div>
              <div className="vertical-steps__step">
                <div className="emoji emoji--big emoji--checkmark" />
                <h2 className={styles.stepTitle}>Review file</h2>
                <p className={styles.stepBody}>
                  Open and review the file with the default information.
                </p>
              </div>
            </div>
            <div className="box nudge--large">
              <button
                className="button button--primary"
                onClick={onBegin}
                type="button"
                id="begin"
              >
                Write the file!
              </button>
            </div>
          </div>
        </FormCardContent>
        <FormCardFooter />
      </FormCard>
    );
  }
}
