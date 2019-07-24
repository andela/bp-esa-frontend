/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'proptypes';
import _ from 'lodash';
import './styles.scss';
import RetryButton from '../Buttons/RetryButton/RetryButton';

class AutomationDetails extends Component {
  state = {
    modalType: 'slack',
    updatedModalContext: {},
  }

  componentWillReceiveProps(nextProps) {
    const [result] = nextProps.data.filter(modal => modal.id === nextProps.modalContent.id);
    this.setState({ updatedModalContext: result });
  }

  setCurrentAutomationType = (event) => {
    const { id } = event.target;
    this.setState({ modalType: id });
  };

  renderDeveloperInfo = (modalContent, cardId) => {
    const {
      formatDates, retryingAutomation, handleRetryAutomation, data,
    } = this.props;
    const { slackAutomations, emailAutomations, nokoAutomations } = modalContent;
    const slackStatus = (slackAutomations && slackAutomations.status) || '';
    const emailStatus = (emailAutomations && emailAutomations.status) || '';
    const nokoStatus = (nokoAutomations && nokoAutomations.slackActivities) || '';
    const name = _.split(modalContent.fellowName, ',');
    const firstInitial = (modalContent.fellowName && name[0].charAt(0)) || '';
    const secondInitial = (modalContent.fellowName && name[1].charAt(1)) || '';
    return (
      <div className="developer-info">
        <div className="devPicture">
          <span>
            {firstInitial}
            {secondInitial}
          </span>
        </div>
        <div className="developer-details">
          <div className="name-group">
            <h1 className="developer-name">{modalContent.fellowName}</h1>
            <div className="tooltip-container" id="ais-link-icon">
              <i
                className="fas fa-external-link-alt"
                title={`Open ${modalContent.fellowName} AIS profile`}
                onClick={() => window.open(`https://ais.andela.com/people/${modalContent.fellowId}`)
                }
              />
              <span className="tooltiptext">Link to AIS</span>
            </div>
          </div>
          <h1 className="partner-name">{modalContent.partnerName}</h1>
          <div className="automation-action">
            <h1 className="automation-type">{modalContent.type}</h1>
            <h1 className="dot">.</h1>
            {slackStatus === 'failure' || emailStatus === 'failure' || nokoStatus === 'failure' ? (
              <h1 className="automation-status">Failed</h1>
            ) : (
              <h1 className="automation-status success">Success</h1>
            )}
            <RetryButton
              retryingAutomation={retryingAutomation}
              handleRetryAutomation={() => handleRetryAutomation(cardId)}
              data={data}
              id="retry-automation-details"
            />
          </div>
          <h1 className="automation-date">{formatDates(modalContent.updatedAt)}</h1>
        </div>
      </div>
    );
  };

  renderChannelTabs = () => {
    const { modalType } = this.state;
    return (
      <div className="channel-tabs-group">
        <div className="channels-tab-background">
          <button
            type="button"
            className={`automations ${modalType === 'slack' ? 'active' : 'deactivated'}`}
            id="slack"
            onClick={this.setCurrentAutomationType}
          >
            Slack
          </button>
          <button
            type="button"
            className={`automations ${modalType === 'email' ? 'active' : 'deactivated'}`}
            id="email"
            onClick={this.setCurrentAutomationType}
          >
            Email
          </button>
          <button
            type="button"
            className={`automations ${modalType === 'noko' ? 'active' : 'deactivated'}`}
            id="noko"
            onClick={this.setCurrentAutomationType}
          >
            Noko
          </button>
        </div>
      </div>
    );
  };

  renderTitles(modalType) {
    return (
      <>
        {modalType === 'slack' && this.renderAppTitles('Channel', 'Action', 'Status')}
        {modalType === 'email' && this.renderAppTitles('Recipient', 'Subject', 'Status')}
        {modalType === 'noko' && this.renderAppTitles('Project Tag', 'Action', 'Status')}
      </>
    );
  }

  renderAppTitles = (titleOne, titleTwo, titleThree) => (
    <div className="slack-table">
      <div className="content-title">{titleOne}</div>
      <div className="content-title">{titleTwo}</div>
      <div className="content-title">{titleThree}</div>
    </div>
  );

  renderDetails = (modalType, modalContent) => (
    <div className="content-container">
      {modalType === 'slack'
        && this.renderAppDetails(
          modalContent,
          'slackAutomations',
          'slackActivities',
          'channelName',
          'type',
        )}
      {modalType === 'email'
        && this.renderAppDetails(
          modalContent,
          'emailAutomations',
          'emailActivities',
          'emailTo',
          'subject',
        )}
      {modalType === 'noko'
        && this.renderAppDetails(
          modalContent,
          'nokoAutomations',
          'nokoActivities',
          'projectId',
          'type',
        )}
    </div>
  );

  renderAppDetails = (
    modalContent,
    automationType,
    automationActivities,
    contentData,
    contentType,
  ) => {
    const automations = modalContent[automationType];
    const appActivities = (automations && automations[automationActivities]) || [];
    return appActivities.map(content => (
      <div key={content.slackUserId}>
        <div className="automation-content">
          <div className="content-row name">{content[contentData]}</div>
          <div className="content-row type">{content[contentType]}</div>
          {this.renderCommonDetails(content)}
        </div>
      </div>
    ));
  };

  renderCommonDetails = content => (
    <>
      {content.status === 'failure' ? (
        <div className="content-row status">{content.status}</div>
      ) : (
        <div className="content-row status success">{content.status}</div>
      )}
    </>
  );

  render() {
    const { isModalOpen, closeModal, modalContent } = this.props;
    const modalClass = isModalOpen ? 'modal-open' : 'modal-closed';
    const { modalType, updatedModalContext } = this.state;
    const ModalContentData = updatedModalContext === undefined ? modalContent : updatedModalContext;
    return (
      <div className={modalClass}>
        <div className="modal-overlay" onClick={closeModal} />
        <div className="modal-body">
          {this.renderDeveloperInfo(ModalContentData, ModalContentData.id)}
          {this.renderChannelTabs()}
          {this.renderTitles(modalType)}
          {this.renderDetails(modalType, ModalContentData)}
          <div className="modal-close">
            <button
              type="button"
              onClick={() => {
                this.setState({ modalType: 'slack' });
                closeModal();
              }}
              className="modal-close-button-group"
            >
              <h1 className="close">CLOSE</h1>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AutomationDetails.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalContent: PropTypes.object.isRequired,
  formatDates: PropTypes.func.isRequired,
  data: PropTypes.array,
  retryingAutomation: PropTypes.bool,
  handleRetryAutomation: PropTypes.func,
};

AutomationDetails.defaultProps = {
  retryingAutomation: false,
  data: [],
  handleRetryAutomation: () => { },
};

export default AutomationDetails;
