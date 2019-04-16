import React, { PureComponent } from 'react';
import PropTypes from 'proptypes';
import createDonut from '../../utils/automationStat';
import capitalizeFirstLetter from '../../utils/capitalize';
import './styles.scss';

class StatsCard extends PureComponent {
  componentDidMount() {
    const { type, stat } = this.props;
    createDonut(stat, `${type}`);
  }

  render() {
    const { type } = this.props;
    return (
      <div className="stat-container">
        <div className="stat-icon">
          <img src={`/${capitalizeFirstLetter(type)}.png`} alt="icon" />
          <p>{capitalizeFirstLetter(type)}</p>
        </div>
        <div id={`${type}`} className="stat-content" />
      </div>
    );
  }
}

StatsCard.propTypes = {
  stat: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default StatsCard;
