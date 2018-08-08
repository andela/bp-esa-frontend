import React, { Component } from 'react';
import Filters from './filters';
import ReportsTables from './reportsTables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

class Dashboard extends Component {
    renderTableData = () => {
        const tickIcon = <FontAwesomeIcon icon={faCheck} />;
        const crossIcon = <FontAwesomeIcon icon={faTimes} />;
        const tableData = {
            tableHead: ['PARTNER NAME', 'SLACK', 'FRECKLE', 'EMAIL'],
            //Test data to simulate pagination
            tableBody: [
                {partner: 'Parner A', slack: tickIcon, freckle: tickIcon, email: tickIcon},
                {partner: 'Parner B', slack: tickIcon, freckle: tickIcon, email: crossIcon},
                {partner: 'Parner C', slack: crossIcon, freckle: crossIcon, email: tickIcon},
                {partner: 'Parner D', slack: tickIcon, freckle: crossIcon, email: crossIcon},
                {partner: 'Parner E', slack: tickIcon, freckle: tickIcon, email: tickIcon},
                {partner: 'Parner F', slack: crossIcon, freckle: crossIcon, email: crossIcon},
                {partner: 'Parner G', slack: crossIcon, freckle: tickIcon, email: tickIcon},
                {partner: 'Parner H', slack: crossIcon, freckle: crossIcon, email: crossIcon},
            ]
        }
        return ({tableData});
    }
  render() {
    const filterCriteria = [
        'Date/Month',
        'Partner',
        '33% Completion',
        '66% Completion',
        '99% Completion',
    ];
    return(
      <div className="dashboard">
            <h1>On-boarding/Off-boarding process report</h1>
            <form id="filterForm">
                <Filters
                    filterCriteria={filterCriteria}
                    path={this.props.match.path}
                />
                    
                <div className="form-group custom-select-input-filter-form">
                    <label htmlFor="status">STATUS:</label>
                    <select className="form-control" id="status">
                        <option>On-boarded</option>
                        <option>Off-boarded</option>
                    </select>
                </div>
            </form>
            <ReportsTables 
                tableData={this.renderTableData()}
                path={this.props.match.path}
            />
      </div>
    );
  }
}

export default Dashboard;
