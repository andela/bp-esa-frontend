import React, { PureComponent } from 'react';
import Header from '../Header';
import mockReport from '../../mocks/mockReport';
import './styles.scss';

class ReportPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      reportData: mockReport,
    };
  }

  /* eslint-disable class-methods-use-this */
  renderAutomationStatus(automationStatus) {
    return (
      automationStatus ? (
        <span>
          Success&nbsp;
          <i className="fa fa-info-circle success" />
        </span>) : (
          <span>
            Failed&nbsp;
            <i className="fa fa-info-circle failed" />
          </span>
      )
    );
  }

  renderTableRows() {
    const { reportData } = this.state;
    return reportData.map((report, index) => (
      <tr key={report.id}>
        <td className="numbering">{index + 1}</td>
        <td className="column1">{report.date}</td>
        <td>{report.fellowName}</td>
        <td>{report.partnerName}</td>
        <td>{report.type}</td>
        <td>{this.renderAutomationStatus(report.slackAutomation.success)}</td>
        <td>{this.renderAutomationStatus(report.emailAutomation.success)}</td>
        <td>{this.renderAutomationStatus(report.freckleAutomation.success)}</td>
      </tr>
    ));
  }


  render() {
    return (
      <div>
        <Header />
        <div id="report-page">
          <div className="table-header">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="numbering">#</th>
                  <th>Date</th>
                  <th>Fellow Name</th>
                  <th>Partner Name</th>
                  <th>Type</th>
                  <th>Slack</th>
                  <th>Email</th>
                  <th>Freckle</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-body">
            <table className="report-table">
              <tbody>
                {this.renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportPage;
