import React from 'react';
import PropTypes from 'prop-types';
import firstPageIcon from '../../assets/first-page-icon.svg';
import lastPageIcon from '../../assets/last-page-icon.svg';
import nextPageIcon from '../../assets/next-page-icon.svg';
import previousPageIcon from '../../assets/previous-page-icon.svg';
import './index.scss';

function Pagination({
  pagination: { numberOfPages }, limit, currentPage,
  handlePagination, onPageChange, onChangeRowCount, tempCurrentPage,
}) {
  const renderButton = (icon, text, handleNav, disabled) => (
    <button
      type="button"
      className={`${disabled ? 'disabled' : 'page-btn icon-btn'}`}
      onClick={() => handleNav(text)}
    >
      <img className="nav-icon" src={icon} alt="text" />
    </button>
  );

  const renderPageNumber = (page, tempPage) => (
    <input
      className="form-input"
      autoComplete="off"
      type="number"
      min={1}
      max={numberOfPages}
      name="pageNumber"
      data-state-name="tempCurrentPage"
      value={tempPage || page}
      onChange={e => onPageChange(e)}
    />
  );

  const renderLimitDropdown = () => (
    <form>
      <label htmlFor="rows-per-page">
        Items per page
      </label>
      <select
        className="select"
        value={limit}
        onChange={e => onChangeRowCount(e)}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </form>
  );

  const renderPaginationPanel = (pages, page) => (
    <>
      <div className="pagination">
        <div className="center-item">
          <p>{`Page ${currentPage} of ${numberOfPages}`}</p>
        </div>
        {renderLimitDropdown()}
        <div className="page-panel">
          {renderButton(firstPageIcon, 'firstPage', handlePagination, (!(page > 1)))}
          {renderButton(previousPageIcon, 'previousPage', handlePagination, (!(page > 1)))}
          {renderPageNumber(currentPage, tempCurrentPage)}
          {renderButton(nextPageIcon, 'nextPage', handlePagination, (!(page < pages)))}
          {renderButton(lastPageIcon, 'lastPage', handlePagination, (!(page < pages)))}
        </div>
      </div>
    </>
  );
  return (
    <>
      {renderPaginationPanel(numberOfPages, currentPage)}
    </>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  handlePagination: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onChangeRowCount: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  tempCurrentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]).isRequired,
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Pagination;
