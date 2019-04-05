import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Spinner from '../Spinner';
import InfoIcon from '../../assets/icons/Info.svg';
import onBoarding from '../../assets/icons/vectorpaint.svg';
import './developerCard.scss';
import RetryButton from '../Buttons/RetryButton/RetryButton';

class DeveloperCard extends Component {
  renderDetails = (classNameDiv, classNameSpan, card) => (
    <div className={classNameDiv}>
      <span className={classNameSpan}>
        {card}
      </span>
    </div>
  );

  renderStatusBand = (className, status, cardId) => {
    const { retryingAutomation, handleRetryAutomation, data } = this.props;
    return (
      <div className={className}>
        <span id={`${status.toLowerCase()}`}>
          {status}
          {
            status === 'FAILURE'
            && (
              <RetryButton
                retryingAutomation={retryingAutomation}
                handleRetryAutomation={() => handleRetryAutomation(cardId)}
                data={data}
                id="retry-automation"
              />
            )
          }
        </span>
      </div>
    );
  };

  renderActivity = (channels, metric, card) => (
    <div className="status-container">
      {
        channels.map((name, index) => {
          const fieldName = card[`${name}Automations`][`${name}Activities`];
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              {_.upperCase(name)}
              <span>
                {`${metric(fieldName, 'success')}
              /
              ${metric(fieldName, 'failure')}`}
              </span>
            </div>
          );
        })
      }
    </div>
  );

  renderDeveloperPic = (firstInit, secondInit) => (
    <div className="developerPicture">
      <div className="oval-1">
        <span>
          {firstInit}
          {secondInit}
        </span>
      </div>
    </div>
  );

  renderCards =() => {
    const { data, openModal, changeModalTypes } = this.props;
    const automation = length => length !== 0;
    const automationMetric = (activities, status) => (
      _.filter(activities, { status }).length
    );
    const metric = (activities, status) => (
      automation(activities.length) ? automationMetric(activities, status) : 0
    );
    return data.map((card) => {
      const name = card.fellowName;
      const newName = _.split(name, ',');
      const firstInitials = newName[0].charAt(0);
      const secondInitials = newName[1].charAt(1);
      return (
        <div className="card" key={card.id}>
          <div className="info-cont">
            <img className="info-icon onBoarding-icon" src={onBoarding} alt="onboarding icon" />
            <img className="info-icon" src={InfoIcon} alt="info icon" role="presentation" onClick={() => { openModal(); changeModalTypes(card); }} />
          </div>
          {this.renderDeveloperPic(firstInitials, secondInitials)}
          {this.renderDetails('developerDetails', 'developerName', card.fellowName)}
          {this.renderDetails('partnerName', '', card.partnerName)}
          {this.renderDetails('developerDetails', 'date', moment(card.updatedAt).format('MM/DD/YYYY, h:mm a'))}
          {this.renderStatusBand('status-band', card.freckleAutomations.status.toUpperCase(), card.id)}
          {this.renderActivity(['slack', 'email', 'freckle'], metric, card)}
        </div>
      );
    });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <div className="cont">
        {isLoading ? <Spinner /> : this.renderCards()}
      </div>
    );
  }
}

DeveloperCard.propTypes = {
  data: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  changeModalTypes: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  retryingAutomation: PropTypes.bool,
  handleRetryAutomation: PropTypes.func.isRequired,
};

DeveloperCard.defaultProps = {
  isLoading: false,
  retryingAutomation: false,
};

export default DeveloperCard;
