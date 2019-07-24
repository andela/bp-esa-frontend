import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Spinner from '../Spinner';
import InfoIcon from '../../assets/icons/Info.svg';
import offboarding from '../../assets/icons/offboarding.svg';
import onboarding from '../../assets/icons/onboarding.svg';
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
    const { retryingAutomation, handleRetryAutomation } = this.props;
    return (
      <div className={className}>
        <span id={`${status && status.toLowerCase()}`}>
          {status}
          {
            status === 'FAILURE'
            && (
              <RetryButton
                retryingAutomation={retryingAutomation}
                handleRetryAutomation={() => handleRetryAutomation(cardId)}
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
          const fieldName = card[`${name}Automations`] && card[`${name}Automations`][`${name}Activities`];
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              {_.upperCase(name)}
              <span>
                {`${metric(fieldName, 'success')}/${fieldName ? fieldName.length : 0}`}
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

  renderCards = () => {
    const { card, openModal, changeModalTypes } = this.props;
    const automation = length => length !== 0;
    const automationMetric = (activities, status) => (
      _.filter(activities, { status }).length
    );
    const metric = (activities, status) => (activities
      && automation(activities.length) ? automationMetric(activities, status) : 0
    );
    const name = card.fellowName;
    const newName = _.split(name, ',');
    const firstInitials = newName[0].charAt(0);
    const secondInitials = newName[1].charAt(1);
    return (
      <div className="card" key={card.id}>
        <div className="info-cont">
          {card.type === 'onboarding'
            ? (
              <div className="tooltip-container" id="onboarding-info-icon">
                <img className="info-icon onBoarding-icon" src={onboarding} alt="onboarding icon" />
                <span className="tooltiptext">On-boarding</span>
              </div>
            ) : (
              <div className="tooltip-container" id="offboarding-info-icon">
                <img className="info-icon onBoarding-icon" src={offboarding} alt="offboarding icon" />
                <span className="tooltiptext">Off-boarding</span>
              </div>
            )}
          <div id="more-info-icon" className="tooltip-container" onClick={() => { openModal(); changeModalTypes(card); }}>
            <img className="info-icon" src={InfoIcon} alt="info icon" role="presentation" id={`${card.id}-id`} />
            <span className="tooltiptext">Details</span>
          </div>
        </div>
        {this.renderDeveloperPic(firstInitials, secondInitials)}
        <div className="clickableCardContent tooltip-container" id="fellow-name" onClick={() => window.open(`https://ais.andela.com/people/${card.fellowId}`)}>
          {this.renderDetails('developerDetails', 'developerName', card.fellowName)}
          <span className="tooltip-icon">
            <i className="fas fa-external-link-alt" />
          </span>
        </div>
        {this.renderDetails('partnerName', '', card.partnerName)}
        {this.renderDetails('developerDetails', 'date', moment(card.updatedAt).format('MM/DD/YYYY, h:mm a'))}
        {card.nokoAutomations && this.renderStatusBand('status-band', card.nokoAutomations.status.toUpperCase(), card.id)}
        {this.renderActivity(['slack', 'email', 'noko'], metric, card)}
      </div>
    );
  };

  render() {
    const { isLoading } = this.props;
    return (isLoading ? <Spinner /> : this.renderCards());
  }
}

DeveloperCard.propTypes = {
  card: PropTypes.object.isRequired,
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
