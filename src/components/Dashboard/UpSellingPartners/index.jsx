import React from 'react';
import './ProgressBar.scss';
import PropTypes from 'prop-types';

// The filler component to indicate progress
const Filler = () => <div className="filler" />;

// The parent Div that houses the filler bar
const ProgressBar = ({ upselledDevs }) => (
  <div className="progress" style={{ width: `${upselledDevs}%` }}>
    <Filler />
  </div>
);

ProgressBar.propTypes = {
  upselledDevs: PropTypes.number.isRequired,
};

export default ProgressBar;
