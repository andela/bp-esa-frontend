import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import FilterDropdown from './FilterDropdown';

export const filterInitialState = {
  showFilterDropdown: false,
  'automation-type': '',
  emailAutomation: '',
  slackAutomation: '',
  nokoAutomation: '',
  searchTerm: '',
  'search-by': '',
  date: {
    from: '',
    to: '',
  },
};

class FilterComponent extends React.PureComponent {
  state = filterInitialState;

  /**
   * Toggle the display of the options available in the filter dropdown
   */
  toggleFilterDropdown = (e) => {
    const { showFilterDropdown } = this.state;
    // The DOM's UL element holding the list of options
    // eslint-disable-next-line
    const filterDropDown = ReactDOM.findDOMNode(this);
    // Handler for clicking anywhere else on the page
    /* istanbul ignore next */
    const closeFilterDropdown = (ev) => {
      if (ev.target !== filterDropDown && !filterDropDown.contains(ev.target) && ev.target.type !== 'checkbox') {
        this.setState({ showFilterDropdown: false });
        document.removeEventListener('click', closeFilterDropdown);
      }
    };
    // If the toggle is clicked while the dropdown is open, close it
    if (e.currentTarget.getAttribute('data-toggle') === 'filter-dropdown' && showFilterDropdown) {
      document.removeEventListener('click', closeFilterDropdown);
      this.setState({ showFilterDropdown: false });
      return;
    }

    // If the filter dropdown is closed, open it and add the event listener
    this.setState({ showFilterDropdown: true });
    document.addEventListener('click', closeFilterDropdown);
  };

  handleInputChange = (e) => {
    e.persist();
    switch (e.target.name) {
      case 'searchTerm':
        this.setState({ [e.target.name]: e.target.value });
        break;
      case 'date':
        this.setState(prevState => (
          {
            [e.target.name]: {
              ...prevState[e.target.name],
              [e.target.id]: e.target.value,
            },
          }));
        break;
      default:
        this.setState({
          [e.target.name]: e.target.checked ? e.target.value : '',
        });
        break;
    }
  };

  /**
   * When a user presses enter or clicks the 'apply filters' button,
   * this function will be invoked
   * It prevents the default behaviour of the 'submit' event then calls the filter
   * prop passed from the ReportPage
   * @param e {Event}
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { filter } = this.props;
    this.setState({ showFilterDropdown: false }, () => filter(this.state));
  };

  render() {
    const { showFilterDropdown } = this.state;
    return (
      <div className="filter-container">
        <form
          className="filter-box"
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <input type="text" className="search-input" name="searchTerm" />
          <div className="filter-button" onClick={this.toggleFilterDropdown} data-toggle="filter-dropdown">
            <img
              src="https://img.icons8.com/small/100/000000/sorting-options.png"
              className="filter-button-icon"
              alt="filter"
              data-toggle="filter-dropdown"
            />
          </div>
          { showFilterDropdown && (
          <FilterDropdown
            filters={this.state}
            handleInputChange={this.handleInputChange}
          />
          )}
        </form>
      </div>
    );
  }
}

FilterComponent.propTypes = {
  filter: PropTypes.func.isRequired,
};

export default FilterComponent;
