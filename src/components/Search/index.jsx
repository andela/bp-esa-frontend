import React, { PureComponent } from 'react';
import PropTypes from 'proptypes';
import './styles.scss';
import classNames from 'classnames';

/* eslint-disable no-restricted-globals */
class Search extends PureComponent {
  constructor() {
    super();
    this.state = {
      searchOptionsVisible: false,
      searchValue: '',
      searchCriteria: '',
      selectedOption: '',
    };
  }

  componentDidUpdate() {
    const { searchValue, searchCriteria } = this.state;
    const { handleSearch } = this.props;
    if (searchValue || searchCriteria) {
      handleSearch(searchValue, searchCriteria);
    }
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      searchOptionsVisible: !prevState.searchOptionsVisible,
    }));
  };

  handleSearchCriteriaChange = (optionId) => {
    this.setState({ searchCriteria: optionId });
  };

  handleSearchValueChange = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  renderSearchOptions() {
    const { options } = this.props;
    const { searchOptionsVisible, selectedOption } = this.state;
    return (
      <ul className={classNames('search-option', { 'search-options-isvisible': searchOptionsVisible })}>
        {options.map(option => (
          <li
            key={option.id}
          >
            <input type="radio" value={option.value} onChange={() => this.handleSearchCriteriaChange(option.id)} checked={selectedOption === option.id} />
            {option.text}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { searchValue } = this.state;
    const { title } = this.props;
    const { searchOptionsVisible } = this.state;
    return (
      <div>
        <input type="text" className="search-input" value={searchValue} onChange={this.handleSearchValueChange} />
        <div className="search" onClick={this.toggleVisibility}>
          <div className="search-title">
            <span className="title">{title}</span>
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
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
