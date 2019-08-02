import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './dashboard.scss';
import Card from './Card';
import { fetchRealTimeReport } from '../../redux/actions/realTimeReport';
import listenToSocketEvent from '../../realTime';
import ActivityFeed from './ActivityFeed';
import Header from '../Header';
import PartnerStats from './PartnerStatsCard';

class Dashboard extends React.Component {
  state = {
    reportData: [],
  };

  componentDidMount = () => {
    // triggers event to fetch data from the API
    this.connectToSocket('newAutomation');
  };

  connectToSocket = (event) => {
    listenToSocketEvent(event, (data) => {
      this.handleDataFetch(data);
    });
  };

  /**
   * @description handles fetching of data and adds to the state
   * @param {object} data coming in from the socket
   * @returns {Void}
   */
  handleDataFetch = (data) => {
    const { fetchUpdates } = this.props;
    fetchUpdates(data);
    const { reportData } = this.state;
    const newData = this.maintainArraySize(data, reportData);
    this.setState({ reportData: newData });
  };

  /**
   * @description keeps data in an array to the amount set
   * @param {object} data to be put inside an array
   * @param {array} arr
   * @returns {*[]} an array with new data
   */
  maintainArraySize = (data, arr) => {
    const newArr = [data, ...arr];
    if (arr.length > ((process.env.REACT_APP_ACTIVITY_FEED_COUNT - 1))) {
      newArr.pop();
      return newArr;
    }
    return newArr;
  };

  render() {
    const {
      currentUser,
      removeCurrentUser,
      history,
    } = this.props;
    return (
      <div className="dashboard">
        <Header
          currentUser={currentUser}
          history={history}
          removeCurrentUser={removeCurrentUser}
          activeTab="dashboard"
        />
        <Card
          classes="engagement"
          title="Engagement Trends"
          component={() => {}}
        />
        <Card
          classes="upselling"
          title="Upselling Partners"
          component={() => {}}
        />
        <Card
          classes="activity-feed-card"
          component={() => ActivityFeed(this.state)}
          title="Activity Feeds"
        />
        <PartnerStats />
      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchUpdates: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  removeCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
};

Dashboard.defaultProps = {
  removeCurrentUser: () => {},
};

const mapStateToProps = state => ({
  automation: state.automation,
});

const mapDispatchToProps = dispatch => ({
  fetchUpdates: () => dispatch(fetchRealTimeReport()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
