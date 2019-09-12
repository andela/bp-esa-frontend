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
import ProgressBar from './UpSellingPartners/index';

class Dashboard extends React.Component {
  state = {
    reportData: [],
    partnerStats: [
      {
        id: 1,
        name: 'Git Prime Git Prime',
        devNum: 30,
        expectedDevNum: 30,
      },
      {
        id: 2,
        name: 'Medeable, inc',
        devNum: 20,
        expectedDevNum: 40,
      },
      {
        id: 3,
        name: 'Building Robotics inc',
        devNum: 10,
        expectedDevNum: 30,
      },
    ],
  };

  upSellData = (partnerStats) => {
    const devs = partnerStats.map((dev) => {
      const finalDev = (dev.devNum / dev.expectedDevNum) * 100;
      const devStats = {
        upSellPercentage: finalDev,
        ...dev,
      };
      return devStats;
    });
    return devs;
  }

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

  renderUpsellingStats = partnerStats => () => {
    const result = this.upSellData(partnerStats);
    return (
      <ul className="upSellList">
        { result.map(stat => (
          <li key={stat.id}>
            <span className="partner-name">{stat.name}</span>
            <span className="developers">{stat.devNum}</span>
            <ProgressBar upselledDevs={stat.upSellPercentage} />
          </li>
        ))}
      </ul>
    );
  };


  render() {
    const {
      currentUser,
      removeCurrentUser,
      history,
    } = this.props;
    const { partnerStats } = this.state;
    return (
      <div className="dashboard-content">
        <Header
          currentUser={currentUser}
          history={history}
          removeCurrentUser={removeCurrentUser}
          activeTab="dashboard"
        />
        <div className="dashboard-items">
          <Card
            classes="engagement"
            title="Engagement Trends"
            component={() => {}}
          />
          <Card
            classes="upSelling"
            title="Upselling Partners"
            component={this.renderUpsellingStats(partnerStats)}
          />
          <Card
            classes="activity-feed-card"
            component={() => ActivityFeed(this.state)}
            title="Activity Feeds"
          />
          <PartnerStats />

        </div>
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
