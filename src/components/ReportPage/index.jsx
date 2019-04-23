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
import ReportNavBar from '../ReportNavBar';
import DeveloperCard from '../developerCards';
import Spinner from '../Spinner';
import './styles.scss';
import { filterInitialState } from '../FilterComponent';
import StatsCard from '../StatsCard';
import { fetchStatsRequest } from '../../redux/actions/automationStats';


/* eslint-disable class-methods-use-this */
export class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: 'cardView',
      filters: filterInitialState,
      pagination: {
        currentPage: 1,
        limit: 25,
      },
      isModalOpen: false,
      modalContent: {},
      tempCurrentPage: false,
    };

    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    const { fetchStat, fetchAllAutomation, location: { search } } = this.props;
    const { pagination, filters } = this.state;
    fetchAllAutomation(pagination, filters);
    const params = new URLSearchParams(search);
    const view = params.get('view');
    this.setState({ viewMode: view });
    this.connectToSocket('newAutomation');

    this.handleOnKeyPress = _.debounce(() => {
      const { tempCurrentPage } = this.state;
      this.setPaginationState({ currentPage: tempCurrentPage });
    }, 1000);
    fetchStat();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { pagination: nextStatePagination, filters: nextStateFilters } = nextState;
    const { pagination: currentStatePagination, filters: currentStateFilters } = this.state;
    const { fetchAllAutomation } = this.props;
    if (JSON.stringify(nextStatePagination) !== JSON.stringify(currentStatePagination)
      || JSON.stringify(nextStateFilters) !== JSON.stringify(currentStateFilters)) {
      fetchAllAutomation(nextStatePagination, nextStateFilters);
    }
    return true;
  }

  connectToSocket = (event) => {
    listenToSocketEvent(event, data => this.updateReportData(data));
  };

  updateReportData = (data) => {
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
    const { pagination: { currentPage } } = this.state;
    const { automation: { pagination: { numberOfPages } } } = this.props;
    const page = this.pageNavigation(action, currentPage, numberOfPages);
    this.setPaginationState({ currentPage: page });
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
    this.setState({ tempCurrentPage: event.target.value }, this.handleOnKeyPress);
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
    this.setState(prevState => (
      {
        ...prevState,
        pagination: { ...prevState.pagination, currentPage: 1 },
        filters,
      }));
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleRetryAutomation = (automationId) => {
    const { retryFailedAutomation } = this.props;
    retryFailedAutomation(automationId);
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  changeModalTypes = (report) => {
    this.setState({ modalContent: report });
  };

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

  renderView = view => () => {
    const { history } = this.props;
    history.push(`/?view=${view}View`);
    this.setState({ viewMode: `${view}View` });
  };

  renderInfoIcon = report => (
    <div className="info- ">
      <i className="fa fa-info-circle" onClick={() => { this.openModal(); this.changeModalTypes(report); }} id="info-icon" />
    </div>
  );

  renderTableRows() {
    const { automation: { data } } = this.props;
    return (data.map((report, index) => {
      const {
        id, updatedAt, fellowId, fellowName, partnerName, type,
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
          </td>
          <td>{this.renderInfoIcon(report)}</td>
        </tr>
      );
    }));
  }

  renderListCard = () => {
    const { viewMode, isModalOpen, modalContent } = this.state;
    const { automation: { data, isLoading, retryingAutomation } } = this.props;
    return (
      viewMode === 'listView'
        ? (
          <div id="report-page">
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
                    <th />
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
            <AutomationDetails
              data={data}
              isModalOpen={isModalOpen}
              closeModal={this.closeModal}
              modalContent={modalContent}
              formatDates={this.formatDates}
              retryingAutomation={retryingAutomation}
              handleRetryAutomation={() => this.handleRetryAutomation()}
            />
          </div>
        )
        : (
          <div>
            <DeveloperCard
              data={data}
              isLoading={isLoading}
              openModal={this.openModal}
              changeModalTypes={this.changeModalTypes}
              retryingAutomation={retryingAutomation}
              handleRetryAutomation={() => this.handleRetryAutomation()}
            />
            <AutomationDetails
              isModalOpen={isModalOpen}
              closeModal={this.closeModal}
              modalContent={modalContent}
              formatDates={this.formatDates}
            />
          </div>
        )

    );
  };

  renderStatisticsCards = () => {
    const { stats } = this.props;
    const statisticsKey = Object.keys(stats.data);
    return (
      <React.Fragment>
        {
          statisticsKey.map(index => (
            <StatsCard key={index} type={index} stat={stats.data[index]} />
          ))
        }
      </React.Fragment>
    );
  }


  render() {
    const { pagination: { limit }, tempCurrentPage } = this.state;
    const {
      currentUser,
      removeCurrentUser,
      history, automation: { error, isLoading },
      automation,
      stats,
    } = this.props;

    return (
      <React.Fragment>
        <Header
          currentUser={currentUser}
          removeCurrentUser={removeCurrentUser}
          history={history}
        />
        <ReportNavBar isStats />
        <div className="stats-wrapper">
          {
            stats.isLoading
              ? <div className="loader-container"><Spinner size="medium" /></div>
              : this.renderStatisticsCards()
          }
        </div>
        <ReportNavBar renderView={this.renderView} filter={this.filter} />
        {
          isLoading ? <Spinner /> : (
            <React.Fragment>
              {Object.keys(error).length === 0
                ? (
                  <React.Fragment>
                    {this.renderListCard()}
                    <Pagination
                      pagination={automation.pagination}
                      handlePagination={this.handlePagination}
                      onPageChange={this.onPageChange}
                      onChangeRowCount={this.onChangeRowCount}
                      limit={limit}
                      tempCurrentPage={tempCurrentPage}
                    />
                  </React.Fragment>
                )
                : (
                  <div className="body-error">
                    <span className="error-message">{error.error}</span>
                  </div>
                )}
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  automation: state.automation,
  stats: state.stats,
});

export const mapDispatchToProps = dispatch => ({
  fetchAllAutomation: (pagination, filters) => dispatch(fetchAutomation(pagination, filters)),
  fetchStat: () => dispatch(fetchStatsRequest()),
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
};

ReportPage.defaultProps = {
  removeCurrentUser: () => { },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportPage);
