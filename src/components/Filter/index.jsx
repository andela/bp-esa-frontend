import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'proptypes';
import './styles.scss';

class Filter extends PureComponent {
  state = {
    filterOptionsIsVisible: false,
    selectedFilters: [],
  }

  toggleVisibility = () => {
    const { filterOptionsIsVisible } = this.state;
    this.setState({ filterOptionsIsVisible: !filterOptionsIsVisible });
  }

  selectFilter = (event) => {
    const { selectedFilters } = this.state;
    const { handleFilterChange } = this.props;
    const filter = event.target.value;
    if (selectedFilters.includes(filter)) {
      const selectedFiltersToMutate = [...selectedFilters];
      selectedFiltersToMutate.splice(selectedFilters.indexOf(filter), 1);
      this.setState({
        selectedFilters: selectedFiltersToMutate,
      });
      handleFilterChange(filter, 'remove_filter');
    } else {
      this.setState({
        selectedFilters: [...selectedFilters, event.target.value],
      });
      handleFilterChange(filter, 'add_filter');
    }
  }

  renderFilterOptions() {
    const { options } = this.props;
    const { filterOptionsIsVisible } = this.state;
    return (
      <ul
        className={classNames('filter-options', { 'filter-options-isvisible': filterOptionsIsVisible })}
      >
        {
          options.map(option => (
            <li key={option.id}>
              <input type="checkbox" value={option.value} onChange={this.selectFilter} />
              <span>{option.text}</span>
            </li>
          ))
        }
      </ul>
    );
  }

  render() {
    const { title } = this.props;
    const { filterOptionsIsVisible } = this.state;
    return (
      <div className="filter">
        <div className="filter-title" onClick={this.toggleVisibility}>
          <span className="title">{title}</span>
          <i
            className={classNames('fa fa-angle-down', { 'rotate-180': filterOptionsIsVisible })}
          />
        </div>
        {this.renderFilterOptions()}
      </div>
    );
  }
}

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;
