/* eslint-disable no-return-assign */
/* eslint-disable no-fallthrough */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Fragment, PureComponent } from 'react';
import URL from 'url';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import { notify } from 'react-notify-toast';
import Header from '../Header';
import './styles.scss';
import AutomationDetails from '../AutomationDetails';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import { pageChange, pageNavigation } from '../../utils';
import ReportNavBar from '../ReportNavBar';

const { REACT_APP_BACKEND_URL } = process.env;
const automationsURL = `${REACT_APP_BACKEND_URL}/api/v1/automations`;

/* eslint-disable class-methods-use-this */
class ReportPage extends PureComponent {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.state = {
      tableHeaders: ['Date', 'Fellow Name', 'Partner Name', 'Type', 'Slack', 'Email', 'Freckle'],
      reportData: [],
      tableMessage: '',
      isModalOpen: false,
      modalContent: {},
      isLoadingReports: false,
      pagination: {
        numberOfPages: 1,
        currentPage: 1,
        limit: 10,
        offset: 1,
      },
    };
  }

  async componentDidMount() {
    const { pagination: { currentPage, limit } } = this.state;
    await this.reportData(currentPage, limit);

    this.handleOnKeyPress = _.debounce(() => {
      const { pagination: { currentPage: page, limit: pageLimit } } = this.state;
      this.reportData(page, pageLimit);
    }, 1000);
  }

  reportData = async (currentPage = 1, limit = 10) => {
    const { isLoadingReports, query } = this.state;
    this.setState({
      isLoadingReports: !isLoadingReports,
      tableMessage: '',
    });
    let offset;
    const parsedAutomationsURL = URL.parse(automationsURL);
    const filterURL = URL.format({
      ...parsedAutomationsURL,
      query: { ...query, page: currentPage, limit },
    });
    await axios
      .get(filterURL)
      .then(({ data }) => {
        offset = data.data && limit * (parseInt(data.pagination.currentPage, 10) - 1);
        this.setState(prevState => ({
          ...prevState,
          isLoadingReports: false,
          reportData: data.data || data,
          pagination: {
            ...prevState.pagination,
            ...data.pagination,
            offset,
          },
        }));
      })
      .catch((error) => {
        notify.show('There was a problem connecting to server, please try again later', 'error');
        this.setState(() => ({
          isLoadingReports: false,
          reportData: [],
        }));
        return error.response;
      });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
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

  /* eslint-disable react/sort-comp */
  // Do not change to arrow function because in the tests,
  // we spy on this function and it has to be on this class's prototype
  // Arrow function definitions do not have a bound prototype
  async filter(f) {
    // create shallow copy of the filters
    const filters = { ...f };
    delete filters.showFilterDropdown;
    delete filters.date;
    /* eslint-disable no-mixed-operators */
    const query = {
      ...filters,
      'date[from]': f.date.from && f.date.from.toISOString() || undefined,
      'date[to]': f.date.to && f.date.to.toISOString() || undefined,
    };
    /* eslint-enable no-mixed-operators */

    this.setState({ query }, this.reportData);
  }

  handlePagination = (action) => {
    const { pagination: { currentPage, numberOfPages, limit } } = this.state;
    const page = pageNavigation(action, currentPage, numberOfPages);
    this.reportData(page, limit);
  };

  setPaginationState = (pagination) => {
    this.setState(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        ...pagination,
      },
    }));
  };

  onChangePage = (event) => {
    const { pagination: { numberOfPages } } = this.state;
    event.preventDefault();
    const currentPage = pageChange(event.target.value, numberOfPages);
    this.setPaginationState({ currentPage });
    this.handleOnKeyPress();
  };

  onChangeRowCount = (event) => {
    event.preventDefault();
    const limit = parseInt(event.target.value, 10);
    this.setPaginationState({ limit });
    this.reportData(1, limit);
  };

  changeModalTypes(report, type) {
    this.setState({ modalContent: report, type });
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
      <span>
        {automationStatus}
&nbsp;
        <span className={`${automationStatus}-text`}>
          {this.statusBreakdown(report, type)}
        </span>
        <i
          className={`fa fa-info-circle ${automationStatus}`}
          onClick={() => { this.openModal(); this.changeModalTypes(report, type); }}
        />
      </span>
    );
  }

  renderTableRows() {
    const {
      reportData, pagination: { offset },
    } = this.state;
    const reports = reportData || [];
    return (reports.map((report, index) => (
      <tr key={report.id}>
        <td className="numbering">{index + offset + 1}</td>
        <td className="column1">{this.formatDates(report.updatedAt)}</td>

        <td
          className="fellow"
          onClick={() => window.open(`https://ais.andela.com/people/${report.fellowId}`)}
          title={report.fellowName}
        >
          {report.fellowName}
        </td>
        <td title={report.partnerName}>{report.partnerName}</td>
        <td>{report.type}</td>
        <td>{this.renderAutomationStatus(report.slackAutomations.status, report, 'slack')}</td>
        <td>{this.renderAutomationStatus(report.emailAutomations.status, report, 'email')}</td>
        <td>{this.renderAutomationStatus(report.freckleAutomations.status, report, 'freckle')}</td>
      </tr>
    )));
  }

  showEmptyRow() {
    const rowStyle = { textAlign: 'center' };

    return (<tr colSpan="8" style={rowStyle}><td>No Data Available</td></tr>);
  }

  render() {
    const { currentUser, removeCurrentUser, history } = this.props;
    const {
      isLoadingReports, pagination, reportData, tableHeaders,
    } = this.state;
    const {
      isModalOpen, modalContent, type,
    } = this.state;

    // eslint-disable-next-line react/destructuring-assignment
    return (
      <Fragment>
        <Header
          currentUser={currentUser}
          removeCurrentUser={removeCurrentUser}
          history={history}
        />
        <ReportNavBar
          filter={this.filter}
        />
        <div id="report-page">
          <div className="table-header">
            <table className="report-table">
              <thead>
                {this.setupHeader(tableHeaders)}
              </thead>
            </table>
          </div>
          <div className="table-body">
            {
              isLoadingReports
                ? <Spinner />
                : (
                  <Fragment>
                    <table className="report-table">
                      <tbody>
                        {this.hasData(reportData) ? this.renderTableRows() : this.showEmptyRow() }
                      </tbody>
                    </table>
                    <Pagination
                      pagination={pagination}
                      onChangePage={this.onChangePage}
                      onChangeRowCount={this.onChangeRowCount}
                      handlePagination={this.handlePagination}
                      handleOnKeyPress={this.handleOnKeyPress}
                    />
                  </Fragment>
                )
            }
          </div>
          {this.hasData(reportData) ? (
            this.addAutomationDetailModal(isModalOpen, type, modalContent)
          ) : ''}
        </div>
      </Fragment>
    );
  }

  addAutomationDetailModal(isModalOpen, type, modalContent) {
    return (
      <AutomationDetails
        isModalOpen={isModalOpen}
        closeModal={this.closeModal}
        modalType={type}
        modalContent={modalContent}
        formatDates={this.formatDates}
      />
    );
  }

  hasData(reportData) {
    return reportData && reportData.length > 0;
  }

  setupHeader(tableHeaders) {
    return (
      <tr>
        <th className="numbering">#</th>
        {tableHeaders.map(head => <th key={head}>{head}</th>)}
      </tr>
    );
  }
}

ReportPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  removeCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
};

ReportPage.defaultProps = {
  removeCurrentUser: () => { },
};

export default ReportPage;
