import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Filter from '../Filter';
import Search from '../Search';
import * as constants from '../constants';
import mockReport from '../../mocks/mockReport';
import './styles.scss';

/* eslint-disable class-methods-use-this */
class ReportPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      reportData: mockReport,
      filters: {
        automationStatus: [],
        automationType: [],
        date: { from: '', to: '' },
        length: 0,
        updated: false,
      },
      searchResult: false,
      filteredReport: [],
    };
  }

  componentDidUpdate() {
    const { filters } = this.state;
    if (filters.updated) {
      this.filterReports();
    }
  }

  setFilter = (filter, filterSet, action) => {
    const { filters: previousFilters, filters: { length } } = this.state;
    if (action === 'add_filter' && filterSet === 'automationStatus') {
      this.setState({
        filters: {
          ...previousFilters,
          automationStatus: [
            ...previousFilters.automationStatus,
            filter,
          ],
          length: length + 1,
          updated: true,
        },
      });
    } else if (action === 'remove_filter' && filterSet === 'automationStatus') {
      const filterToMutate = [...previousFilters.automationStatus];
      filterToMutate.splice(filterToMutate.indexOf(filter), 1);
      this.setState({
        filters: {
          ...previousFilters,
          automationStatus: filterToMutate,
          length: length - 1,
          updated: true,
        },
      });
    } else if (action === 'add_filter' && filterSet === 'automationType') {
      this.setState({
        filters: {
          ...previousFilters,
          automationType: [
            ...previousFilters.automationType,
            filter,
          ],
          length: length + 1,
          updated: true,
        },
      });
    } else if (action === 'remove_filter' && filterSet === 'automationType') {
      const filterToMutate = [...previousFilters.automationType];
      filterToMutate.splice(filterToMutate.indexOf(filter), 1);
      this.setState({
        filters: {
          ...previousFilters,
          automationType: filterToMutate,
          length: length - 1,
          updated: true,
        },
      });
    } else if (action === 'set_from_date' && filterSet === 'date') {
      let newLength = length;
      if (filter && !previousFilters.date.from) {
        newLength = length + 1;
      } else if (!filter && previousFilters.date.from) {
        newLength = length - 1;
      }
      this.setState({
        filters: {
          ...previousFilters,
          date: {
            ...previousFilters.date,
            from: filter,
          },
          length: newLength,
          updated: true,
        },
      });
    } else if (action === 'set_to_date' && filterSet === 'date') {
      let newLength = length;
      if (filter && !previousFilters.date.to) {
        newLength = length + 1;
      } else if (!filter && previousFilters.date.to) {
        newLength = length - 1;
      }
      this.setState({
        filters: {
          ...previousFilters,
          date: {
            ...previousFilters.date,
            to: filter,
          },
          length: newLength,
          updated: true,
        },
      });
    }
  }

  doSearch = (searchValue, optionId) => {
    const { reportData } = this.state;
    let filteredReport = null;
    if (searchValue && optionId === 1) {
      filteredReport = reportData.filter(report => report.fellowName === searchValue);
    }
    if (searchValue && optionId === 2) {
      filteredReport = reportData.filter(report => report.partnerName === searchValue);
    }
    if (filteredReport) {
      this.setState({
        filteredReport,
        searchResult: true,
      });
    } else {
      this.setState({ searchResult: false });
    }
  }

  filterWithAutomationStatus(report) {
    const { filters: { automationStatus } } = this.state;
    return automationStatus.every((filterTerm) => {
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
        default:
          return false;
      }
    });
  }

  filterWithAutomationType(report) {
    const { filters: { automationType } } = this.state;
    return automationType.every((filteTerm) => {
      switch (filteTerm) {
        case constants.ONBOARDING:
          return (report.type === 'Onboarding');
        case constants.OFFBOARDING:
          return (report.type === 'Offboarding');
        default:
          return false;
      }
    });
  }

  filterWithDate(reportDate) {
    const { filters: { date: { from, to } } } = this.state;
    const reportDateTime = new Date(reportDate).getTime();
    const fromTime = new Date(from).getTime();
    const toTime = new Date(to).getTime();
    return (reportDateTime >= fromTime && reportDateTime <= toTime);
  }

  runFilters(report) {
    const { filters } = this.state;
    if (!filters.length) {
      return true;
    }
    const filterResult = [];
    if (filters.automationStatus.length) {
      filterResult.push(this.filterWithAutomationStatus(report));
    }
    if (filters.automationType.length) {
      filterResult.push(this.filterWithAutomationType(report));
    }
    if (filters.date.from && filters.date.to) {
      filterResult.push(this.filterWithDate(report.date));
    }
    return filterResult.every(result => result === true);
  }

  filterReports() {
    const { reportData, filters: previousFilters } = this.state;
    const filteredReport = reportData.filter(report => this.runFilters(report));
    this.setState({
      filteredReport,
      filters: {
        ...previousFilters,
        updated: false,
      },
    });
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
        filterSet={filter.filterSet}
        title={filter.title}
        options={filter.options}
        handleFilterChange={this.setFilter}
      />
    ));
  }

  renderSearch() {
    return <Search handleSearch={this.doSearch} />;
  }

  renderTableRows() {
    const {
      filters, filteredReport, reportData, searchResult,
    } = this.state;
    const reports = filters.length || searchResult ? filteredReport : reportData;
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
    const { currentUser, removeCurrentUser, history } = this.props;
    return (
      <div>
        <Header
          currentUser={currentUser}
          removeCurrentUser={removeCurrentUser}
          history={history}
        />
        <div id="report-page">
          <div className="filter-box">
            <p>Filters</p>
            {this.renderFilters()}
            {this.renderSearch()}
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

ReportPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  removeCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
};

ReportPage.defaultProps = {
  removeCurrentUser: () => {},
};

export default ReportPage;
