import React from 'react';
import './dashboard.scss';
import Card from './Card';

class Dashboard extends React.Component {
  /*
  Use case Example for dashboard card
  component is a function that returns a component
  Suppose you are working on Upselling Partners task
  and you have created a class component named Upselling.
  You will create a function renderUpselling that returns
  your Upselling jsx component and pass it as props.
   */
  renderUpselling = () => (
    <div>
        upselling component
    </div>
  );

  render() {
    return (
      <>
        <Card
          classes="engagement"
          title="Engagement Trends"
          component={() => {}}
        />
        <Card
          classes="upselling"
          title="Upselling Partners"
          component={this.renderUpselling}
        />
      </>
    );
  }
}

export default Dashboard;
