import React from 'react';
import { PropTypes } from 'prop-types';
import './RetryButton.scss';

const RetryButton = ({ handleRetryAutomation, retryingAutomation }) => (
  <button
    type="button"
    className="retry-btn"
    onClick={handleRetryAutomation}
    disabled={retryingAutomation}
  >
    RETRY
  </button>
);

RetryButton.propTypes = {
  handleRetryAutomation: PropTypes.func.isRequired,
  retryingAutomation: PropTypes.bool,
};

RetryButton.defaultProps = {
  retryingAutomation: false,
};

export default RetryButton;
