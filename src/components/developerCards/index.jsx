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
      <span className={classNameSpan}>{card}</span>
    </div>
  );

  replaceFreckleToNoko = (data) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const i of data) {
      const { status } = i.freckleAutomations;
      const nokoActivities = i.freckleAutomations.freckleActivities;
      i.nokoAutomations = { status, nokoActivities };
    }
  };

  renderStatusBand = (className, status, cardId) => {
    const { retryingAutomation, handleRetryAutomation, data } = this.props;
    this.replaceFreckleToNoko(data);
    return (
      <div className={className}>
        <span id={`${status.toLowerCase()}`}>
          {status}
          {status === 'FAILURE' && (
            <RetryButton
              retryingAutomation={retryingAutomation}
              handleRetryAutomation={() => handleRetryAutomation(cardId)}
              data={data}
              id="retry-automation"
            />
          )}
        </span>
      </div>
    );
  };

  renderActivity = (channels, metric, card) => (
    <div className="status-container">
      {channels.map((name, index) => {
        const fieldName = card[`${name}Automations`][`${name}Activities`];
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            {_.upperCase(name)}
            <span>{`${metric(fieldName, 'success')}/${fieldName.length}`}</span>
          </div>
        );
      })}
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
    const { data, openModal, changeModalTypes } = this.props;
    const automation = length => length !== 0;
    const automationMetric = (activities, status) => _.filter(activities, { status }).length;
    const metric = (activities, status) => (automation(activities.length) ? automationMetric(activities, status) : 0);
    return data.map((card, index) => {
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
              <img className="info-icon" src={InfoIcon} alt="info icon" role="presentation" id={`${index}-id`} />
              <span className="tooltiptext">Details</span>
            </div>
          </div>
          {this.renderDeveloperPic(firstInitials, secondInitials)}
          {this.renderDetails('developerDetails', 'developerName', card.fellowName)}
          {this.renderDetails('partnerName', '', card.partnerName)}
          {this.renderDetails(
            'developerDetails',
            'date',
            moment(card.updatedAt).format('MM/DD/YYYY, h:mm a'),
          )}
          {this.renderStatusBand(
            'status-band',
            card.freckleAutomations.status.toUpperCase(),
            card.id,
          )}
          {this.renderActivity(['slack', 'email', 'noko'], metric, card)}
        </div>
      );
    });
  };

  render() {
    const { isLoading } = this.props;
    return <div className="cont">{isLoading ? <Spinner /> : this.renderCards()}</div>;
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
