/* eslint-disable no-return-assign */
/* eslint-disable no-fallthrough */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'toastr/toastr.scss';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchAutomation, retryAutomation } from '../../redux/actions/automationActions';
import AutomationDetails from '../AutomationDetails';
import Header from '../Header';
import listenToSocketEvent from '../../realTime';
import Pagination from '../Pagination';
import UpdateTab from '../UpdateTab';
import ReportNavBar from '../ReportNavBar';
import DeveloperCard from '../developerCards';
import Spinner from '../Spinner';
import './styles.scss';
import { filterInitialState } from '../FilterComponent';
import StatsCard from '../StatsCard/index';
import { fetchStatsRequest } from '../../redux/actions/automationStats';
import { fetchRealTimeReport, resetRealTimeReport } from '../../redux/actions/realTimeReport';

/* eslint-disable class-methods-use-this */
export class ReportPage extends Component {
  constructor() {
    super();
    this.state = {
      viewMode: 'cardView',
      filters: filterInitialState,
      isLoadingReports: false,
      reportData: [],
      pagination: {
        currentPage: 1,
        limit: 10,
      },
      searchResult: false,
      filteredReport: [],
      isModalOpen: false,
      modalContent: {},
      tempCurrentPage: false,
    };

    this.filter = this.filter.bind(this);
  }

  async componentDidMount() {
    const {
      fetchStat,
      fetchAllAutomation,
      location: { search },
    } = this.props;
    const { pagination, filters } = this.state;
    fetchAllAutomation(pagination, filters);

    const params = new URLSearchParams(search);
    const view = params.get('view');
    if (view !== null) {
      this.setState({ viewMode: view });
    }
    this.connectToSocket('newAutomation');

    this.handleOnKeyPress = _.debounce(() => {
      const { tempCurrentPage } = this.state;
      this.setPaginationState({ currentPage: tempCurrentPage });
    }, 1000);
    fetchStat('days');
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { pagination: nextStatePagination, filters: nextStateFilters } = nextState;
    const { pagination: currentStatePagination, filters: currentStateFilters } = this.state;
    const { fetchAllAutomation } = this.props;
    if (
      JSON.stringify(nextStatePagination) !== JSON.stringify(currentStatePagination)
			|| JSON.stringify(nextStateFilters) !== JSON.stringify(currentStateFilters)
    ) {
      fetchAllAutomation(nextStatePagination, nextStateFilters);
    }
    return true;
  }

	connectToSocket = (event) => {
	  listenToSocketEvent(event, data => this.updateReportData(data));
	};

	updateReportData = (data) => {
	  const { fetchUpdates } = this.props;
	  fetchUpdates(data);
	  const { reportData } = this.state;
	  const newData = [data, ...reportData];
	  this.setState({ reportData: newData });
	};

	pageNavigation = (action, currentPage, numberOfPages) => {
	  switch (action) {
	    case 'nextPage':
	      return currentPage === numberOfPages ? currentPage : currentPage + 1;
	    case 'previousPage':
	      return currentPage === 1 ? currentPage : currentPage - 1;
	    case 'firstPage':
	      return 1;
	    case 'lastPage':
	      return numberOfPages;
	    default:
	      return currentPage;
	  }
	};

	handlePagination = (action) => {
	  const {
	    pagination: { currentPage },
	  } = this.state;
	  const {
	    automation: {
	      pagination: { numberOfPages },
	    },
	    resetUpdates,
	  } = this.props;
	  const page = this.pageNavigation(action, currentPage, numberOfPages);
	  this.setPaginationState({ currentPage: page });
	  resetUpdates();
	};

	handleUpdates = (e) => {
	  e.preventDefault();
	  const { fetchAllAutomation, resetUpdates } = this.props;
	  const { pagination, filters } = this.state;

	  resetUpdates();
	  fetchAllAutomation(pagination, filters);
	  this.setPaginationState({ currentPage: 1 });
	};

	setPaginationState = (pagination) => {
	  this.setState(prevState => ({
	    ...prevState,
	    pagination: {
	      ...prevState.pagination,
	      ...pagination,
	    },
	    tempCurrentPage: false,
	  }));
	};

	onPageChange = (event) => {
	  event.preventDefault();
	  const page = parseInt(event.target.value, 10);
	  this.setState({ tempCurrentPage: page }, this.handleOnKeyPress);
	};

	onChangeRowCount = (event) => {
	  event.preventDefault();
	  const limit = parseInt(event.target.value, 10);
	  this.setPaginationState({ currentPage: 1, limit });
	};

	formatDates = (date) => {
	  const dateFormat = {
	    year: 'numeric',
	    month: 'numeric',
	    day: 'numeric',
	    hour: 'numeric',
	    minute: 'numeric',
	  };
	  return new Date(date).toLocaleDateString('en-US', dateFormat);
	};

	toggleModal = () => {
	  this.setState(prevState => ({
	    isModalOpen: !prevState.isModalOpen,
	  }));
	};

	handleRetryAutomation = (automationId) => {
	  const { retryFailedAutomation } = this.props;
	  retryFailedAutomation(automationId);
	};

	changeModalTypes = (report) => {
	  this.setState({ modalContent: report });
	};

	// Do not change to arrow function because in the tests,
	// we spy on this function and it has to be on this class's prototype
	// Arrow function definitions do not have a bound prototype
	filter(filters) {
	  // reset the showFilterDropdown flag to be same as the filterInitialState
	  /* eslint-disable-next-line no-param-reassign */
	  filters.showFilterDropdown = false;
	  const { filters: stateFilters } = this.state;
	  if (JSON.stringify(stateFilters) === JSON.stringify(filters)) {
	    return;
	  }
	  this.setState(prevState => ({
	    ...prevState,
	    pagination: { ...prevState.pagination, currentPage: 1 },
	    filters,
	  }));
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
	    return stats.successCount, stats.failureCount;
	  });
	  return `(${stats.successCount}/${activities.length})`;
	}

	renderAutomationStatus(automationStatus, report, type) {
	  return (
  <span className={`${automationStatus}-text`}>
    {automationStatus}
				&nbsp;
    <div className="metrics">{this.statusBreakdown(report, type)}</div>
  </span>
	  );
	}

	renderView = view => () => {
	  const { history } = this.props;
	  history.push(`/?view=${view}View`);
	  this.setState({ viewMode: `${view}View` });
	};

	renderInfoIcon = report => (
  <div className="info- ">
    <i
      className="fa fa-info-circle"
      onClick={() => {
				  this.toggleModal();
				  this.changeModalTypes(report);
      }}
      id="info-icon"
    />
  </div>
	);

	renderTableRows() {
	  const {
	    automation: { data },
	  } = this.props;
	  return data.map((report, index) => {
	    const {
	      id,
	      updatedAt,
	      fellowId: developerId,
	      fellowName: developerName,
	      partnerName,
	      type,
	    } = report;
	    return (
  <tr key={id}>
    <td className="numbering">{index + 1}</td>
    <td className="column1">{this.formatDates(updatedAt)}</td>
    <td
      className="fellow"
      onClick={() => window.open(`https://ais.andela.com/people/${developerId}`)}
      title={developerName}
    >
      {developerName}
    </td>
    <td title={report.partnerName}>{partnerName}</td>
    <td>{type}</td>
    <td>{this.renderAutomationStatus(report.slackAutomations.status, report, 'slack')}</td>
    <td>{this.renderAutomationStatus(report.emailAutomations.status, report, 'email')}</td>
    <td>{this.renderAutomationStatus(report.freckleAutomations.status, report, 'noko')}</td>
    <td>{this.renderInfoIcon(report)}</td>
  </tr>
	    );
	  });
	}

	renderUpdateTab = () => {
	  const { viewMode } = this.state;
	  const { realTimeReport } = this.props;
	  return (
	    realTimeReport.length > 0 && (
				<UpdateTab
  numberOfItems={realTimeReport.length}
  handleUpdates={this.handleUpdates}
  view={viewMode}
				/>
	    )
	  );
	};

	renderListCard = () => {
	  const { viewMode, isModalOpen, modalContent } = this.state;
	  const {
	    automation: { data, isLoading, retryingAutomation },
	  } = this.props;
	  function addNokoStatus(data) {
	    for (const i of data) {
	      i.nokoAutomations = {nokoActivies:i.freckleAutomations.freckleActivities, status:i.freckleAutomations.status};
	    }
	  }
		addNokoStatus(data);
	  return viewMode === 'listView' ? (
  <div id="report-page">
    {this.renderUpdateTab()}
    <div className="table-header">
      <table className="report-table">
        <thead className="report-table-header">
          <tr>
            <th className="numbering">#</th>
            <th>Date</th>
            <th>Engineer Name</th>
            <th>Partner Name</th>
            <th>Type</th>
            <th>Slack</th>
            <th>Email</th>
            <th>Noko</th>
            <th />
          </tr>
        </thead>
      </table>
    </div>
    <div className="table-body">
      <table className="report-table">
        <tbody>{this.renderTableRows()}</tbody>
      </table>
    </div>
    <AutomationDetails
      data={data}
      isModalOpen={isModalOpen}
      closeModal={this.toggleModal}
      modalContent={modalContent}
      formatDates={this.formatDates}
      retryingAutomation={retryingAutomation}
      handleRetryAutomation={() => this.handleRetryAutomation()}
    />
  </div>
	  ) : (
  <div>
    {this.renderUpdateTab()}
    <DeveloperCard
      data={data}
      isLoading={isLoading}
      openModal={this.toggleModal}
      changeModalTypes={this.changeModalTypes}
      retryingAutomation={retryingAutomation}
      handleRetryAutomation={() => this.handleRetryAutomation()}
    />
    <AutomationDetails
      isModalOpen={isModalOpen}
      closeModal={this.toggleModal}
      modalContent={modalContent}
      formatDates={this.formatDates}
    />
  </div>
	  );
	};

	renderStatisticsCards = () => {
	  const { stats } = this.props;
	  const nokoDetails = stats.data.freckle;
	  const nokoStats = { ...stats.data, noko: nokoDetails };
	  delete nokoStats.freckle;
	  const statisticsKey = Object.keys(nokoStats);
	  return (
  <React.Fragment>
    {statisticsKey.map(index => (
      <StatsCard key={index} type={index} stat={nokoStats[index]} />
    ))}
  </React.Fragment>
	  );
	};

	render() {
	  const {
	    pagination: { limit, currentPage },
	    tempCurrentPage,
	    viewMode,
	  } = this.state;
	  const {
	    currentUser,
	    removeCurrentUser,
	    history,
	    automation: { error, isLoading },
	    automation,
	    stats,
	    fetchStat,
	  } = this.props;
	  return (
  <React.Fragment>
    <Header
      currentUser={currentUser}
      removeCurrentUser={removeCurrentUser}
      history={history}
      activeTab="automations"
    />
    <ReportNavBar isStats fetchStat={fetchStat} />
    <div className="stats-wrapper">
      {stats.isLoading ? (
        <div className="loader-container">
          <Spinner size="medium" />
        </div>
      ) : (
					  this.renderStatisticsCards()
      )}
    </div>
    <ReportNavBar renderView={this.renderView} filter={this.filter} viewMode={viewMode} />
    {isLoading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        {Object.keys(error).length === 0 ? (
          <React.Fragment>
            {this.renderListCard()}
            <Pagination
              pagination={automation.pagination}
              handlePagination={this.handlePagination}
              onPageChange={this.onPageChange}
              onChangeRowCount={this.onChangeRowCount}
              limit={limit}
              currentPage={currentPage}
              tempCurrentPage={tempCurrentPage}
            />
          </React.Fragment>
        ) : (
          <div className="body-error">
            <span className="error-message">{error.error}</span>
          </div>
        )}
      </React.Fragment>
    )}
  </React.Fragment>
	  );
	}
}

export const mapStateToProps = state => ({
  realTimeReport: state.realTimeReport,
  automation: state.automation,
  stats: state.stats,
});

export const mapDispatchToProps = dispatch => ({
  fetchAllAutomation: (pagination, filters) => dispatch(fetchAutomation(pagination, filters)),
  fetchUpdates: () => dispatch(fetchRealTimeReport()),
  resetUpdates: () => dispatch(resetRealTimeReport()),
  fetchStat: period => dispatch(fetchStatsRequest(period)),
  retryFailedAutomation: () => dispatch(retryAutomation()),
});

ReportPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  removeCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
  automation: PropTypes.object.isRequired,
  fetchAllAutomation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  fetchStat: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  retryFailedAutomation: PropTypes.func.isRequired,
  fetchUpdates: PropTypes.func,
  realTimeReport: PropTypes.array,
  resetUpdates: PropTypes.func,
};

ReportPage.defaultProps = {
  removeCurrentUser: () => {},
  fetchUpdates: () => {},
  resetUpdates: () => {},
  realTimeReport: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportPage);
