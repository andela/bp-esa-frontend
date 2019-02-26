import * as React from 'react';
import PropTypes from 'proptypes';
import './styles.scss';

const Spinner = ({ size }) => (
  <div className={`spinner ${size}`} />
);

Spinner.propTypes = {
  size: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'large',
};

export default Spinner;
