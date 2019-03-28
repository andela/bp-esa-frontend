/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import PropTypes from 'proptypes';
import _ from 'lodash';
import './styles.scss';


class AutomationDetails extends PureComponent {
  constructor() {
    super();
    this.state = {
      modalType: 'slack',
    };
  }

  setCurrentAutomationType = (event) => {
    const { id } = event.target;
    this.setState({ modalType: id });
  }

  renderDeveloperInfo = (modalContent) => {
    const { formatDates } = this.props;
    const { slackAutomations, emailAutomations, freckleAutomations } = modalContent;
    const slackStatus = (slackAutomations && slackAutomations.status) || '';
    const emailStatus = (emailAutomations && emailAutomations.status) || '';
    const freckleStatus = (freckleAutomations && freckleAutomations.slackActivities) || '';
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
            <i className="fas fa-external-link-alt" />
          </div>
          <h1 className="partner-name">{modalContent.partnerName}</h1>
          <div className="automation-action">
            <h1 className="automation-type">{modalContent.type}</h1>
            <h1 className="dot">.</h1>
            {slackStatus === 'failure' || emailStatus === 'failure' || freckleStatus === 'failure' ? <h1 className="automation-status">Failed</h1> : <h1 className="automation-status success">Success</h1>}
            <button type="button" className="retry-button-group">
              <h1 className="retry">RETRY</h1>
            </button>
          </div>
          <h1 className="automation-date">{formatDates(modalContent.updatedAt)}</h1>
        </div>
      </div>
    );
  }

  renderChannelTabs = () => {
    const { modalType } = this.state;
    return (
      <div className="channel-tabs-group">
        <div className="channels-tab-background">
          <button type="button" className={`automations ${modalType === 'slack' ? 'active' : 'deactivated'}`} id="slack" onClick={this.setCurrentAutomationType}>Slack</button>
          <button type="button" className={`automations ${modalType === 'email' ? 'active' : 'deactivated'}`} id="email" onClick={this.setCurrentAutomationType}>Email</button>
          <button type="button" className={`automations ${modalType === 'freckle' ? 'active' : 'deactivated'}`} id="freckle" onClick={this.setCurrentAutomationType}>Freckle</button>
        </div>
      </div>
    );
  }

  renderTitles(modalType) {
    return (
      <React.Fragment>
        {modalType === 'slack' && this.renderSlackTitles()}
        {modalType === 'email' && this.renderEmailTitles()}
        {modalType === 'freckle' && this.renderFreckleTitles()}
      </React.Fragment>
    );
  }

  renderSlackTitles = () => (
    <div className="slack-table">
      <div className="content-title">Channel</div>
      <div className="content-title">Action</div>
      <div className="content-title">Status</div>
    </div>
  );

  renderEmailTitles = () => (
    <div className="slack-table">
      <div className="content-title">Recipient</div>
      <div className="content-title">Subject</div>
      <div className="content-title">Status</div>
    </div>
  );

  renderFreckleTitles = () => (
    <div className="slack-table">
      <div className="content-title">Project Tag</div>
      <div className="content-title">Action</div>
      <div className="content-title">Status</div>
    </div>
  );

  renderDetails = (modalType, modalContent) => (
    <div className="content-container">
      {modalType === 'slack' && this.renderSlackDetails(modalContent)}
      {modalType === 'email' && this.renderEmailDetails(modalContent)}
      {modalType === 'freckle' && this.renderFreckleDetails(modalContent)}
    </div>
  );

  renderSlackDetails = (modalContent) => {
    const { slackAutomations } = modalContent;
    const slackActivities = (slackAutomations && slackAutomations.slackActivities) || [];
    return (slackActivities.map(content => (
      <div key={content.id}>
        <div className="automation-content">
          <div className="content-row name">{content.channelName}</div>
          <div className="content-row type">{content.type}</div>
          {this.renderCommonDetails(content)}
        </div>
      </div>
    )));
  }

  renderEmailDetails = (modalContent) => {
    const { emailAutomations } = modalContent;
    const emailActivities = (emailAutomations && emailAutomations.emailActivities) || [];
    return (emailActivities.map(content => (
      <div key={content.id}>
        <div className="automation-content">
          <div className="content-row name">{content.emailTo}</div>
          <div className="content-row subject">{content.subject}</div>
          {this.renderCommonDetails(content)}
        </div>
      </div>
    )));
  }

  renderFreckleDetails = (modalContent) => {
    const { freckleAutomations } = modalContent;
    const freckleActivities = (freckleAutomations && freckleAutomations.freckleActivities) || [];
    return (freckleActivities.map(content => (
      <div key={content.id}>
        <div className="automation-content">
          <div className="content-row name">{content.projectId}</div>
          <div className="content-row type">{content.type}</div>
          {this.renderCommonDetails(content)}
        </div>
      </div>
    )));
  }

  renderCommonDetails = content => (
    <React.Fragment>
      { content.status === 'failure' ? <div className="content-row status">{content.status}</div> : <div className="content-row status success">{content.status}</div> }
    </React.Fragment>
  )

  render() {
    const {
      isModalOpen,
      closeModal,
      modalContent,
    } = this.props;
    const modalClass = isModalOpen ? 'modal-open' : 'modal-closed';
    const { modalType } = this.state;
    return (
      <div className={modalClass}>
        <div className="modal-overlay" onClick={closeModal} />
        <div className="modal-body">
          {this.renderDeveloperInfo(modalContent)}
          {this.renderChannelTabs()}
          {this.renderTitles(modalType)}
          {this.renderDetails(modalType, modalContent)}
          <div className="modal-close">
            <button type="button" onClick={() => { this.setState({ modalType: 'slack' }); closeModal(); }} className="modal-close-button-group">
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
};

export default AutomationDetails;
