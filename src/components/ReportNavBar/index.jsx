import * as React from 'react';
import './styles.scss';
import FilterComponent from '../FilterComponent';

const ReportNavBar = props => (
  <div className="report-navbar-container">
    <div className="report-navbar">
      <FilterComponent {...props} />
    </div>
  </div>
);

export default ReportNavBar;
