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
import StatsCard from '../StatsCard';
import { fetchStatsRequest } from '../../redux/actions/automationStats';


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
      isModalOpen: false,
      modalContent: {},
    };
  }

  componentDidMount() {
    const { fetchStat, fetchAllAutomation, location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const view = params.get('view');
    this.setState({ viewMode: view });
    this.connectToSocket('newAutomation');
    fetchStat();
    fetchAllAutomation();
  }

  connectToSocket = (event) => {
    listenToSocketEvent(event, data => this.updateReportData(data));
  }

  updateReportData = (data) => {
    const { reportData } = this.state;
    const newData = [data, ...reportData];
    this.setState({ reportData: newData });
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

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  changeModalTypes = (report) => {
    this.setState({ modalContent: report });
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

  renderInfoIcon = report => (
    <div className="info- ">
      <i className="fa fa-info-circle" onClick={() => { this.openModal(); this.changeModalTypes(report); }} />
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
    const {
      viewMode, isModalOpen, modalContent, filters,
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
                    <th />
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
              modalContent={modalContent}
              formatDates={this.formatDates}
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
    const {
      currentUser, removeCurrentUser, history,
    } = this.props;
    const { stats, automation: { error } } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    return (
      <div>
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

export const mapStateToProps = state => ({
  automation: state.automation,
  stats: state.stats,
});

export const mapDispatchToProps = dispatch => ({
  fetchAllAutomation: () => dispatch(fetchAutomation()),
  fetchStat: () => dispatch(fetchStatsRequest()),
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
};

ReportPage.defaultProps = {
  removeCurrentUser: () => { },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportPage);
