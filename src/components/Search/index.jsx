
import React, { PureComponent } from 'react';
import PropTypes from 'proptypes';
import './styles.scss';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

class Search extends PureComponent {
  constructor() {
    super();
    this.state = {
      searchOptionsVisible: false,
      searchValue: '',
      searchCriteria: 1,
    };
  }

  componentDidUpdate() {
    const { searchValue, searchCriteria } = this.state;
    const { handleSearch } = this.props;
    if (searchValue || searchCriteria) {
      handleSearch(searchValue, searchCriteria);
    }
  }

  // toggleVisibility = () => {
  //   this.setState(prevState => ({
  //     searchOptionsVisible: !prevState.searchOptionsVisible,
  //   }));
  // };

    /**
   * Toggle the display of the options available in the dropdown
   */
  toggleVisibility = e => {
    const { searchOptionsVisible } = this.state;

    // The DOM's UL element holding the list of options
    const filterOptionsEl = ReactDOM.findDOMNode(this).getElementsByClassName('search-option')[0];

    // Handler for clicking anywhere else on the page
    const clickAway = ev => {
      if (ev.target === filterOptionsEl || filterOptionsEl.contains(ev.target)) return;
      if (e !== ev) {
        this.setState({ searchOptionsVisible:  false});
        document.removeEventListener('click', clickAway);
      }
    }

    if (!searchOptionsVisible) {
      this.setState({ searchOptionsVisible: true});
      document.addEventListener('click', clickAway);
    }
  }

  handleSearchCriteriaChange = (optionId) => {
    this.setState({
      searchCriteria: optionId,
    });
  };

  handleSearchValueChange = (event) => {
    event.preventDefault();
    this.setState({ searchValue: event.target.value });
  }

  renderSearchOptions() {
    const { searchOptionsVisible } = this.state;
    return (
      <ul className={classNames('search-option', { 'search-options-isvisible': searchOptionsVisible })}>
        <li>
          <input type="radio" defaultChecked name="search" onChange={() => this.handleSearchCriteriaChange(1)} />
          {'Fellow Name'}
        </li>
        <li>
          <input type="radio" name="search" onChange={() => this.handleSearchCriteriaChange(2)} />
          {'Partner Name'}
        </li>
      </ul>
    );
  }

  render() {
    const { searchValue } = this.state;
    const { searchOptionsVisible, searchCriteria } = this.state;
    return (
      <div>
        <input type="text" className="search-input" value={searchValue} onChange={this.handleSearchValueChange} />
        <div className="search">
          <div className="search-title" onClick={event => this.toggleVisibility(event)}>
            <span className="title">
              {'Search With'}
              {' | '}
              {searchCriteria === 1 ? 'Fellow Name' : 'Partner Name'}
            </span>

            <i
              className={classNames('fa fa-angle-down', { 'rotate-180': searchOptionsVisible })}
            />
          </div>
          {this.renderSearchOptions()}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
