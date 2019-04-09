/* eslint-disable no-return-assign */
/* eslint-disable no-fallthrough */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import 'toastr/toastr.scss';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as constants from '../constants';
import { fetchAutomation } from '../../redux/actions/automation';
import AutomationDetails from '../AutomationDetails';
import Header from '../Header';
import Filter from '../Filter';
import FiltersBar from '../FiltersBar';
import listenToSocketEvent from '../../realTime';
import Pagination from '../Pagination';
import UpdateTab from '../UpdateTab';
import ReportNavBar from '../ReportNavBar';
import DeveloperCard from '../developerCards';
import { fetchRealTimeReport, resetRealTimeReport } from '../../redux/actions/realTimeReport';
import Search from '../Search';
import Spinner from '../Spinner';
import './styles.scss';
import pageNavigation from '../../utils';


/* eslint-disable class-methods-use-this */
export class ReportPage extends Component {
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
      isLoadingReports: false,
      pagination: {
        currentPage: 1,
        limit: 10,
        pageNumber: 1,
      },
      searchResult: false,
      filteredReport: [],
      isModalOpen: false,
      modalContent: {},
      type: '',
    };
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const { pagination: { currentPage, limit } } = this.state;
    this.fetcAutomationReport(currentPage, limit);

    const params = new URLSearchParams(search);
    const view = params.get('view');
    this.setState({ viewMode: view });
    this.connectToSocket('newAutomation');

    this.handleOnKeyPress = _.debounce(() => {
      const { pagination: { pageNumber: page, limit: pageLimit } } = this.state;
      this.fetcAutomationReport(page, pageLimit);
    }, 1000);
  }

  componentDidUpdate() {
    const { filters } = this.state;
    if (filters.updated) {
      this.filterReports();
    }
  }

  fetcAutomationReport = async (currentPage, limit) => {
    const { fetchAllAutomation } = this.props;
    const { page } = await fetchAllAutomation(currentPage, limit);

    this.setState(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        pageNumber: page,
      },
    }));

    return fetchAllAutomation(currentPage, limit);
  }

  connectToSocket = (event) => {
    listenToSocketEvent(event, data => this.updateReportData(data));
  }

  updateReportData = (data) => {
    const { fetchUpdates } = this.props;
    fetchUpdates(data);
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


  pageChange = (value, numberOfPages) => {
    const page = parseInt(value, 10);
    let currentPage = 1;
    if (page > 0 && page <= numberOfPages) {
      currentPage = page;
    } else if (typeof page !== 'number') {
      currentPage = '';
    } else {
      currentPage = numberOfPages;
    }

    return currentPage;
  }

  handlePagination = (action) => {
    const { pagination: { limit } } = this.state;
    const { automation, resetUpdates } = this.props;
    const { pagination: { currentPage, numberOfPages } } = automation;
    const page = pageNavigation(action, currentPage, numberOfPages);
    this.fetcAutomationReport(page, limit);
    resetUpdates();
  }

  setPaginationState = (pagination) => {
    this.setState(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        ...pagination,
      },
    }));
  }

  onPageChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const { automation, resetUpdates } = this.props;
    const { pagination: { numberOfPages } } = automation;

    const pageNumber = value > 1
      ? this.pageChange(value, numberOfPages)
      : 1;

    this.setPaginationState({ pageNumber });
    this.handleOnKeyPress();
    resetUpdates();
  }

  onChangeRowCount = (event) => {
    event.preventDefault();
    const { resetUpdates } = this.props;
    const limit = parseInt(event.target.value, 10);
    this.setPaginationState({ limit });
    this.fetcAutomationReport(1, limit);
    resetUpdates();
  }

  handleUpdates = (e) => {
    e.preventDefault();
    const { fetchAllAutomation, resetUpdates } = this.props;
    const { pagination: { limit } } = this.state;
    fetchAllAutomation(1, limit);
    resetUpdates();
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
      const {
        id,
        updatedAt,
        fellowId,
        fellowName,
        partnerName,
        type,
      } = report;
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

  renderUpdateTab = () => {
    const { viewMode } = this.state;
    const { realTimeReport } = this.props;
    return realTimeReport.length > 0
    && <UpdateTab numberOfItems={realTimeReport.length} handleUpdates={this.handleUpdates} view={viewMode} />;
  }

  renderListCard = () => {
    const {
      viewMode, isModalOpen, modalContent, type, filters,
    } = this.state;
    const { automation } = this.props;
    const { data, isLoading } = automation;
    return (
      <Fragment>
        { viewMode === 'listView'
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
              {this.renderUpdateTab()}
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
          )
          : (
            <Fragment>
              {this.renderUpdateTab()}
              <DeveloperCard data={data} isLoading={isLoading} />
            </Fragment>
          )}
      </Fragment>
    );
  };

  render() {
    const { pagination: { limit, pageNumber }, isLoading } = this.state;
    const {
      currentUser,
      removeCurrentUser,
      history, automation: { error },
      automation,
    } = this.props;
    return (
      <>
        <Header
          currentUser={currentUser}
          removeCurrentUser={removeCurrentUser}
          history={history}
        />
        <ReportNavBar renderView={this.renderView} />
        {Object.keys(error).length === 0
          ? (
            <>
              {isLoading
                ? <Spinner />
                : (
                  <>
                    {this.renderListCard()}
                    <Pagination
                      pagination={automation.pagination}
                      handlePagination={this.handlePagination}
                      onPageChange={this.onPageChange}
                      onChangeRowCount={this.onChangeRowCount}
                      limit={limit}
                      pageNumber={pageNumber}
                    />
                  </>
                )
              }
            </>
          )
          : (
            <div className="body-error">
              <span className="error-message">{error.error}</span>
            </div>
          )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  automation: { ...state.automation },
  realTimeReport: state.realTimeReport,
});

const mapDispatchToProps = {
  fetchAllAutomation: fetchAutomation,
  fetchUpdates: fetchRealTimeReport,
  resetUpdates: resetRealTimeReport,
};

ReportPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  removeCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
  automation: PropTypes.object.isRequired,
  fetchAllAutomation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  fetchUpdates: PropTypes.func,
  realTimeReport: PropTypes.array,
  resetUpdates: PropTypes.func,
};

ReportPage.defaultProps = {
  removeCurrentUser: () => { },
  fetchUpdates: () => { },
  resetUpdates: () => { },
  realTimeReport: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportPage);
