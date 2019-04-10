/* eslint-disable no-return-assign */
/* eslint-disable no-fallthrough */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'toastr/toastr.scss';
import { connect } from 'react-redux';
import { fetchAutomation } from '../../redux/actions/automation';
import Header from '../Header';
import Filter from '../Filter';
import Search from '../Search';
import * as constants from '../constants';
import FiltersBar from '../FiltersBar';
import './styles.scss';
import AutomationDetails from '../AutomationDetails';
import Spinner from '../Spinner';
import listenToSocketEvent from '../../realTime';
import ReportNavBar from '../ReportNavBar';
import DeveloperCard from '../developerCards';


/* eslint-disable class-methods-use-this */
export class ReportPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      viewMode: 'cardView',
      reportData: [],
      filters: {
        automationStatus: [],
        automationType: [],
        date: { from: '', to: '' },
        length: 0,
        updated: false,
      },
      searchResult: false,
      filteredReport: [],
      isModalOpen: false,
      modalContent: {},
      type: '',
    };
  }

  componentDidMount() {
    const { fetchAllAutomation, location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const view = params.get('view');
    this.setState({ viewMode: view });
    this.connectToSocket('newAutomation');
    fetchAllAutomation();
  }


  componentDidUpdate() {
    const { filters } = this.state;
    if (filters.updated) {
      this.filterReports();
    }
  }


  connectToSocket = (event) => {
    listenToSocketEvent(event, data => this.updateReportData(data));
  }

  updateReportData = (data) => {
    const { reportData } = this.state;
    const newData = [ data, ...reportData ];
    this.setState({ reportData: newData });
  }

  setFilter = (filter, filterSet, action) => {
    const { filters: previousFilters, filters: { length } } = this.state;
    if (action === 'add_filter') {
      this.setState({
        filters: {
          ...previousFilters,
          [filterSet]: [
            ...previousFilters[filterSet],
            filter,
          ],
          length: length + 1,
          updated: true,
        },
      });
    } else if (action === 'remove_filter') {
      const filterToMutate = [...previousFilters[filterSet]];
      filterToMutate.splice(filterToMutate.indexOf(filter), 1);
      this.setState({
        filters: {
          ...previousFilters,
          [filterSet]: filterToMutate,
          length: length - 1,
          updated: true,
        },
      });
    }
    if (action === 'set_from_date' && filterSet === 'date') {
      this.setDateToAndFrom(previousFilters.date.from, filter, 'from');
    } else if (action === 'set_to_date' && filterSet === 'date') {
      this.setDateToAndFrom(previousFilters.date.to, filter, 'to');
    }
  }

  setDateToAndFrom = (dateType, filter, type) => {
    const { filters: previousFilters, filters: { length } } = this.state;
    let newLength = length;
    newLength = filter && !dateType ? length + 1 : newLength;
    newLength = !filter && dateType ? length - 1 : newLength;
    const filterWorkers = {
      ...previousFilters,
      date: {
        ...previousFilters.date,
      },
      length: newLength,
      updated: true,
    };
    filterWorkers.date[type] = filter;
    this.setState({
      filters: filterWorkers,
    });
  }

  doSearch = (searchValue, optionId) => {
    const { reportData } = this.state;

    let filteredReport = null;

    const searchCriteria = optionId === 1 ? 'fellowName' : 'partnerName';

    if (searchValue) {
      filteredReport = reportData.filter(
        report => report[searchCriteria].toLowerCase().includes(searchValue.toLowerCase()),
      );
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

  formatDates = (date) => {
    const dateFormat = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedDate = new Date(date).toLocaleDateString('en-US', dateFormat);
    return formattedDate;
  }

  filterWithAutomationStatus(report) {
    const { filters: { automationStatus } } = this.state;
    return automationStatus.every((filterTerm) => {
      switch (filterTerm) {
        case constants.FAILED_AUTOMATIONS:
          return (report.slackAutomations.status === 'failure'
            || report.freckleAutomations.status === 'failure'
            || report.emailAutomations.status === 'failure'
          );
        case constants.SUCCESSFUL_AUTOMATIONS:
          return (report.slackAutomations.status === 'success'
            && report.freckleAutomations.status === 'success'
            && report.emailAutomations.status === 'success'
          );
        case constants.FAILED_SLACK_AUTOMATIONS:
          return (report.slackAutomations.status === 'failure');
        case constants.FAILED_FRECKLE_AUTOMATIONS:
          return (report.freckleAutomations.status === 'failure');
        case constants.FAILED_EMAIL_AUTOMATIONS:
          return (report.emailAutomations.status === 'failure');
        case constants.SUCCESSFUL_SLACK_AUTOMATIONS:
          return (report.slackAutomations.status) === 'success';
        case constants.SUCCESSFUL_FRECKLE_AUTOMATIONS:
          return (report.freckleAutomations.status === 'success');
        case constants.SUCCESSFUL_EMAIL_AUTOMATIONS:
          return (report.emailAutomations.status === 'success');
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
          return (report.type === 'onboarding');
        case constants.OFFBOARDING:
          return (report.type === 'offboarding');
        default:
          return false;
      }
    });
  }

  filterWithDate(reportDate) {
    const { filters: { date: { from, to } } } = this.state;
    const reportDateTime = new Date(reportDate).getTime();
    const fromTime = new Date(from).getTime();
    const toTime = new Date(to).getTime() + 84600000;
    return (reportDateTime >= fromTime && reportDateTime <= toTime);
  }

  runFilters(report) {
    const { filters } = this.state;
    const filterResult = [];
    if (filters.automationStatus.length) {
      filterResult.push(this.filterWithAutomationStatus(report));
    }
    if (filters.automationType.length) {
      filterResult.push(this.filterWithAutomationType(report));
    }
    if (filters.date.from && filters.date.to) {
      filterResult.push(this.filterWithDate(report.updatedAt));
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


  statusBreakdown(automation, type) {
    const activities = automation[`${type}Automations`][`${type}Activities`] || [];
    const stats = { successCount: 0, failureCount: 0 };
    activities.forEach((activity) => {
      if (activity.status === 'success') {
        stats.successCount += 1;
      } else {
        stats.failureCount += 1;
      }
      return (stats.successCount, stats.failureCount);
    });
    return `(${stats.successCount}/${activities.length})`;
  }

  renderAutomationStatus(automationStatus, report, type) {
    return (
      <span className={`${automationStatus}-text`}>
        {automationStatus}
        &nbsp;
        <div className="metrics">
          {this.statusBreakdown(report, type)}
        </div>

      </span>
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


  renderView = view => () => {
    const { history } = this.props;
    history.push(`/?view=${view}View`);
    this.setState({ viewMode: `${view}View` });
  };

  renderInfoIcon = () => (
    <div className="info-icon">
      <i className="fa fa-info-circle" />
    </div>
  );


  renderTableRows() {
    const { automation: { data } } = this.props;
    return (data.map((report, index) => {
      const { id, updatedAt, fellowId, fellowName, partnerName, type } = report;
      return (
        <tr key={id}>
          <td className="numbering">{index + 1}</td>
          <td className="column1">{this.formatDates(updatedAt)}</td>
          <td
            className="fellow"
            onClick={() => window.open(`https://ais.andela.com/people/${fellowId}`)}
            title={fellowName}
          >
            {fellowName}
          </td>
          <td title={report.partnerName}>{partnerName}</td>
          <td>{type}</td>
          <td>{this.renderAutomationStatus(report.slackAutomations.status, report, 'slack')}</td>
          <td>{this.renderAutomationStatus(report.emailAutomations.status, report, 'email')}</td>
          <td>
            {this.renderAutomationStatus(report.freckleAutomations.status, report, 'freckle')}
            {this.renderInfoIcon()}
          </td>
        </tr>
      );
    }));
  }

  renderListCard = () => {
    const {
      viewMode, isModalOpen, modalContent, type, filters,
    } = this.state;
    const { automation: { data, isLoading } } = this.props;
    return (
      viewMode === 'listView'
        ? (
          <div id="report-page">
            <div className="filter-box">
              <p>Filters</p>
              {this.renderFilters()}
              {this.renderSearch()}
            </div>
            <FiltersBar
              filters={filters}
            />
            <div className="table-header">
              <table className="report-table">
                <thead className="report-table-header">
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
              {
              isLoading
                ? <Spinner />
                : (
                  <table className="report-table">
                    <tbody>
                      {this.renderTableRows()}
                    </tbody>
                  </table>
                )
            }
            </div>
            <AutomationDetails
              isModalOpen={isModalOpen}
              closeModal={this.closeModal}
              modalType={type}
              modalContent={modalContent}
              formatDates={this.formatDates}
            />
          </div>
        ) : <DeveloperCard data={data} isLoading={isLoading} />

    );
  };


  render() {
    const {
      currentUser, removeCurrentUser, history,
    } = this.props;
    const { automation: { error } } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    return (
      <div>
        <Header
          currentUser={currentUser}
          removeCurrentUser={removeCurrentUser}
          history={history}
        />
        <ReportNavBar renderView={this.renderView} />
        {Object.keys(error).length === 0
          ? this.renderListCard()
          : (
            <div className="body-error">
              <span className="error-message">{error.error}</span>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  automation: state.automation,
});

const mapDispatchToProps = dispatch => ({
  fetchAllAutomation: () => dispatch(fetchAutomation()),
});

ReportPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  removeCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
  automation: PropTypes.object.isRequired,
  fetchAllAutomation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

ReportPage.defaultProps = {
  removeCurrentUser: () => { },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportPage);
