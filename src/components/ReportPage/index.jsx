import React, { PureComponent } from 'react';
import Header from '../Header';
import Filter from '../Filter';
import * as constants from '../constants';
import mockReport from '../../mocks/mockReport';
import './styles.scss';

/* eslint-disable class-methods-use-this */
class ReportPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      reportData: mockReport,
      filters: [],
      filteredReport: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { filters } = this.state;
    if (prevState.filters !== filters) {
      this.filterReports();
    }
  }

  setFilters = (filter, action) => {
    const { filters: previousFilters } = this.state;
    if (action === 'add_filter') {
      this.setState({
        filters: [
          ...previousFilters,
          filter,
        ],
      });
    } else if (action === 'remove_filter') {
      const filterToMutate = [...previousFilters];
      filterToMutate.splice(filterToMutate.indexOf(filter), 1);
      this.setState({
        filters: filterToMutate,
      });
    }
  }

  runFilters(report) {
    const { filters } = this.state;
    return filters.every((filterTerm) => {
      switch (filterTerm) {
        case constants.FAILED_AUTOMATIONS:
          return (!report.slackAutomation.success
            || !report.freckleAutomation.success
            || !report.emailAutomation.success
          );
        case constants.SUCCESSFUL_AUTOMATIONS:
          return (report.slackAutomation.success
            && report.freckleAutomation.success
            && report.emailAutomation.success
          );
        case constants.FAILED_SLACK_AUTOMATIONS:
          return (!report.slackAutomation.success);
        case constants.FAILED_FRECKLE_AUTOMATIONS:
          return (!report.freckleAutomation.success);
        case constants.FAILED_EMAIL_AUTOMATIONS:
          return (!report.emailAutomation.success);
        case constants.SUCCESSFUL_SLACK_AUTOMATIONS:
          return (report.slackAutomation.success);
        case constants.SUCCESSFUL_FRECKLE_AUTOMATIONS:
          return (report.freckleAutomation.success);
        case constants.SUCCESSFUL_EMAIL_AUTOMATIONS:
          return (report.emailAutomation.success);
        case constants.ONBOARDING:
          return (report.type === 'Onboarding');
        case constants.OFFBOARDING:
          return (report.type === 'Offboarding');
        default:
          return false;
      }
    });
  }

  filterReports() {
    const { reportData } = this.state;
    const filteredReport = reportData.filter(report => this.runFilters(report));
    this.setState({ filteredReport });
  }

  renderAutomationStatus(automationStatus) {
    return (
      automationStatus ? (
        <span>
          Success&nbsp;
          <i className="fa fa-info-circle success" />
        </span>) : (
          <span>
            Failed&nbsp;
            <i className="fa fa-info-circle failed" />
          </span>
      )
    );
  }

  renderFilters() {
    return constants.filters.map(filter => (
      <Filter
        key={filter.id}
        title={filter.title}
        options={filter.options}
        handleFilterChange={this.setFilters}
      />
    ));
  }

  renderTableRows() {
    const { filters, filteredReport, reportData } = this.state;
    const reports = filters.length ? filteredReport : reportData;
    return reports.map((report, index) => (
      <tr key={report.id}>
        <td className="numbering">{index + 1}</td>
        <td className="column1">{report.date}</td>
        <td>{report.fellowName}</td>
        <td>{report.partnerName}</td>
        <td>{report.type}</td>
        <td>{this.renderAutomationStatus(report.slackAutomation.success)}</td>
        <td>{this.renderAutomationStatus(report.emailAutomation.success)}</td>
        <td>{this.renderAutomationStatus(report.freckleAutomation.success)}</td>
      </tr>
    ));
  }


  render() {
    return (
      <div>
        <Header />
        <div id="report-page">
          <div className="filter-box">
            <p>Filters</p>
            {this.renderFilters()}
          </div>
          <div className="table-header">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="numbering">#</th>
                  <th>Date</th>
                  <th>Fellow Name</th>
                  <th>Partner Name</th>
                  <th>Type</th>
                  <th>Slack</th>
                  <th>Email</th>
                  <th>Freckle</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-body">
            <table className="report-table">
              <tbody>
                {this.renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportPage;
