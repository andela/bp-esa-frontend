import React, { PureComponent } from 'react';
import PropTypes from 'proptypes';
import ReactDOM from 'react-dom';
import './styles.scss';

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      categoryTitle: 'today',
    };
  }

  showSection = () => {
    const { collapse } = this.state;
    const { collapseValue } = this.hideSection(collapse);
    this.setState({
      collapse: collapseValue,
    });
    document.addEventListener('click', this.closeStatDropdown);
  };

  hideSection = (collapse) => {
    let collapseValue;
    if (!collapse) {
      collapseValue = true;
    } else {
      collapseValue = false;
    }
    return { collapseValue };
  };

  closeStatDropdown = (event) => {
    const statsDropDown = ReactDOM.findDOMNode(this);
    if (event.target !== statsDropDown) {
      this.setState({
        collapse: true,
      });
      document.removeEventListener('click', this.closeStatDropdown);
    }
  };

  selectPeriod = (event) => {
    const { fetchStat } = this.props;
    const { innerHTML, id } = event.target;
    this.setState({
      collapse: true,
      categoryTitle: innerHTML,
    });
    fetchStat(id);
  }

  render() {
    const { collapse, categoryTitle } = this.state;
    return (
      <div className="stat-dropdown-container">
        Automations stats for
        <span className="stat-dropdown-caret" onClick={this.showSection}>
          {` ${categoryTitle}`}<img src="/drop-down.png" alt="down" />
        </span>
        {!collapse ? (
          <React.Fragment>
            <div className="stat-dropdown-content">
              <div className="stat-dropdown-item" id="days" onClick={this.selectPeriod}>
                today
              </div>
              <div className="stat-dropdown-item" id="weeks" onClick={this.selectPeriod}>
                this week
              </div>
              <div className="stat-dropdown-item" id="months" onClick={this.selectPeriod}>
                this month
              </div>
              <div className="stat-dropdown-item" id="years" onClick={this.selectPeriod}>
                this year
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

Dropdown.propTypes = {
  fetchStat: PropTypes.func.isRequired,
};

export default Dropdown;
