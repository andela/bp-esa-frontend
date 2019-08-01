import React, { Component } from 'react';
import Card from '../Card';
import './partnersStatsCard.scss';

class PartnerStats extends Component {
  renderDiv = value => (
    <div className="stats-value">{value}</div>
  );

  renderStatsCard = (type) => {
    const statsCard = {
      newPartner: this.renderDiv(7),
      partnerChurns: this.renderDiv(2),
      totalUpSell: this.renderDiv(63),
      totalDownSell: this.renderDiv(6),
    };
    return (
      statsCard[type]
    );
  };

  renderCard = (title, component) => (
    <Card classes="partner-stats" component={component} title={title} />
  );

  render() {
    return (
      <div className="partner-stats-container">
        {this.renderCard('New Partner', () => this.renderStatsCard('newPartner'))}
        {this.renderCard('Partner Churns', () => this.renderStatsCard('partnerChurns'))}
        {this.renderCard('Total Upsell', () => this.renderStatsCard('totalUpSell'))}
        {this.renderCard('Total Downsell', () => this.renderStatsCard('totalDownSell'))}
      </div>
    );
  }
}

export default PartnerStats;
