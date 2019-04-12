/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import './styles.scss';


class AutomationDetails extends PureComponent {
  renderAutomation = status => ((status === 'success')
    ? <h4 className="modal-values">Success</h4> : <h4 className="modal-values">Failed</h4>
  );

  renderModalDetails = (modalType, modalContent) => (
    <div>
      <h1 className="modal-title">
        {modalType}
        {' '}
        Automation Details
      </h1>
      <div className="line">
        <span className="long" />
        <span className="short" />
      </div>
      {this.renderCommonDetails(modalContent, modalType)}
      { (modalType === 'email' || modalType === 'slack') && this.renderModalTable(modalContent, modalType)}
    </div>
  );

  renderCommonDetails = (modalContent, modalType) => {
    const {
      fellowName, partnerName, createdAt, slackAutomations,
      emailAutomations, freckleAutomations, email,
    } = modalContent;
    const { formatDates } = this.props;
    const date = formatDates(createdAt);
    return (
      <div className="flex-container">
        <div className="modal-data">
          <h2 className="modal-labels"> Developer Name:</h2>
          <h2 className="modal-labels"> Developer Email:</h2>
          <h4 className="modal-labels"> Partner Name:</h4>
          <h4 className="modal-labels"> Date:</h4>
          <h4 className="modal-labels"> Status:</h4>
        </div>
        <div className="modal-data">
          <h4 className="modal-values">{fellowName}</h4>
          <h4 className="modal-values">{email}</h4>
          <h4 className="modal-values">{partnerName}</h4>
          <h4 className="modal-values">{date}</h4>
          {modalType === 'slack' && this.renderAutomation(slackAutomations.status)}
          {modalType === 'email' && this.renderAutomation(emailAutomations.status)}
          {modalType === 'freckle' && this.renderAutomation(freckleAutomations.status)}
        </div>
      </div>
    );
  };


  renderModalTable = (modalContent, modalType) => {
    const { emailAutomations, slackAutomations } = modalContent;
    const contents = modalType === 'email' ? emailAutomations.emailActivities : slackAutomations.slackActivities;
    return (
      <div className="table-header-details">
        <table className="details-table">
          <thead>
            <tr>
              {modalType === 'email' ? <th>Sent to</th> : <th>Channel</th>}
              {modalType === 'email' ? <th>Subject</th> : <th>Auto Type</th>}
              <th>Status</th>
              <th>Status Message</th>
            </tr>
          </thead>
        </table>
        <div className="automation-table">
          {contents.map((content) => {
            const { recipient } = content;
            return (
              <div key={modalType === 'email' ? recipient : uuid.v4()} className="table-body-details">
                <table className="details-table">
                  <tbody>
                    <tr>
                      {this.renderTableData(content, modalType)}
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  renderTableData = (content, modalType) => {
    const {
      channelName, type, recipient, subject, status, statusMessage,
    } = content;
    let automationMedia = channelName;
    let automationTitle = type;
    if (modalType === 'email') {
      automationMedia = recipient;
      automationTitle = subject;
    }
    return (
      <React.Fragment>
        <td>{automationMedia}</td>
        <td>{automationTitle}</td>
        {status === 'success' ? <td>Success</td> : <td>Failed</td>}
        <td>{statusMessage}</td>
      </React.Fragment>
    );
  }

  render() {
    const {
      isModalOpen,
      closeModal,
      modalContent,
      modalType,
    } = this.props;
    const modalClass = isModalOpen ? 'modal-open' : 'modal-closed';
    return (
      <div className={modalClass}>
        <div className="modal-overlay" onClick={closeModal} />
        <div className={`modal-body ${modalType}`}>
          <i className="fas fa-times" onClick={closeModal} />
          {this.renderModalDetails(modalType, modalContent)}
        </div>
      </div>
    );
  }
}

AutomationDetails.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalContent: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  formatDates: PropTypes.func.isRequired,
};

export default AutomationDetails;
