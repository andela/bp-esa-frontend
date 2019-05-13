import React from 'react';
import { connect } from 'react-redux';
import './dashboard.scss';
import PropTypes from 'prop-types';
import Card from './Card';
import Header from '../Header';

class Dashboard extends React.Component {
  partnerStats = [
    {
      name: 'Git Prime Git Prime',
      devNum: 30,
    },
    {
      name: 'Medeable, inc',
      devNum: 40,
    },
    {
      name: 'Building Robotics inc',
      devNum: 60,
    },
    {
      name: 'Reaction Commerce, inc',
      devNum: 9,
    },
    {
      name: 'Crux Informatics',
      devNum: 13,
    },
  ];
  /*
  Use case Example for dashboard card
  component is a function that returns a component
  Suppose you are working on Upselling Partners task
  and you have created a class component named Upselling.
  You will create a function renderUpselling that returns
  your Upselling jsx component and pass it as props.
   */

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
          component={this.renderUpsellingStats(this.partnerStats)}
        />

        <Card
          classes="activity"
          title="Activity"
          component={() => {}}
        />

      </div>
    );
  }
}

Dashboard.propTypes = {
  currentUser: PropTypes.object.isRequired,
  removeCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
};

Dashboard.defaultProps = {
  removeCurrentUser: () => {},
};

export default connect(null, {})(Dashboard);
