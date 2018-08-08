import React, { Component } from 'react';
import Filters from './filters';
import Search from './search';
import ReportsTables from './reportsTables';

class ReportPage extends Component {
  renderTableData = () => {
    const pathName = this.props.match.path;
    let tableData;
    switch (pathName) {
        case '/slack-report':
          tableData = {
            tableHead: ['DEV NAME', 'SLACK CHANNEL', 'DATE', 'ADDITION/REMOVAL', 'STATUS'],
            tableBody: [
              {devName: 'Dev A', slack: 'available-developers', date: '10-8-2018', activity: 'ADDITION', status:'Fail'},
            ]
          }
          break;
        case '/freckle-report':
          tableData = {
            tableHead: ['DEV NAME', 'PARTNER TAG', 'DATE', 'STATUS'],
            tableBody: [
              {devName: 'Dev A', partner: '#ABC', date: '10-8-2018', status:'Success'},
            ]
          }
          break;
        case '/email-report':
          tableData = {
            tableHead: ['PARTNER', 'DEV NAME', 'TO EMAIL', 'SUBJECT', 'DATE', 'STATUS'],
            tableBody: [
              {partner: 'ABC', devName: 'Dev x', toEmail:'test-success@andela.com', subject:'On-boarded', date:'10-8-2018', status:'Success'},
            ]
          }
          break;
        default:
          tableData = {
            tableHead: [],
            tableBody: []
          };
    }
    return ({tableData});
  }

  render() {
    const filterCriteria = [
      'Date/Month',
      'Partner',
      'Developer name',
      'Status',
      'Addition',
      'Removal',
      'Channel'
    ];
    return(
      <div className="report_page">
        <h1>Search Filter</h1>
        <form id="filterForm">
          <Filters
            filterCriteria={filterCriteria}
            path={this.props.match.path}
          />
        </form>
        <ReportsTables 
          tableData={this.renderTableData()}
          path={this.props.match.path}
        />
      </div>
    );
  }
}

export default ReportPage;
