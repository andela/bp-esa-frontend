import React, { Component } from 'react';
import FilterSearchForm from './filterSearchForm';

class ReportPage extends Component {
  render() {
    const filterCriteria = [
      { name: 'date', display: 'Date/month (is a range)' },
      { name: 'partner', display: 'Partner'},
      { name: 'developer', display: 'Developer name'},
      { name: 'status', display: 'Status'},
      { name: 'addition', display: 'Addition'},
      { name: 'removal', display: 'Removal'},
      { name: 'channel', display: 'Channel'}
    ];
    return(
      <div className="report_page">
        <FilterSearchForm filterCriteria={filterCriteria} />
        <table className="report_table">
          <tr>
            <th>DEV NAME</th>
            <th>SLACK CHANNEL</th>
            <th>DATE</th>
            <th>ADDITION/REMOVAL</th>
            <th>STATUS</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <div className="pagination_container">
          <div className="pagination">
            <a href="#">&laquo;</a>
            <a className="active" href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">7</a>
            <a href="#">8</a>
            <a href="#">9</a>
            <a href="#">&raquo;</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportPage;
