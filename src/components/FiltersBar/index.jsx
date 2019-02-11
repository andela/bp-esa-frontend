import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import './styles.scss';

class FiltersBar extends PureComponent {
  addFilterTags = (filters) => {
    let tags = [];
    tags = [...tags, ...filters.automationStatus, ...filters.automationType];
    tags = filters.date.from ? [...tags, `from: ${filters.date.from}`] : tags;
    tags = filters.date.to ? [...tags, `to: ${filters.date.to}`] : tags;
    return tags;
  }

  render() {
    const { filters } = this.props;
    const tags = this.addFilterTags(filters);
    const filterTags = tags.map(tag => (
      <div key={tag} className="tags">
        <span className="filter-tags">
          <i className="far fa-times-circle" />&nbsp;
          {tag}
        </span>
      </div>
    ));
    return (
      <div>
        {tags.length > 0
          ? (
            <div className="filter-tag-box">
              <h6 className="filter-tags-label">Active Filters</h6>
              <div className="filter-scroll">
                {filterTags}
              </div>
            </div>
          ) : null}
      </div>

    );
  }
}

FiltersBar.propTypes = {
  filters: Proptypes.object.isRequired,
};

export default FiltersBar;
