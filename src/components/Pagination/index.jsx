import React, { Fragment } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import nextPageIcon from '../../assets/icons/next-icon.svg';
import prevPageIcon from '../../assets/icons/previous-icon.svg';
import lastPageIcon from '../../assets/icons/last-page-icon.svg';
import firstPageIcon from '../../assets/icons/first-page-icon.svg';

export default function Pagination({
  pagination: { numberOfPages, currentPage, limit },
  handlePagination, onChangePage, onChangeRowCount,
}) {
  const renderButton = (icon, text, handleNav, disabled) => (
    <button className={`${disabled ? 'disabled' : 'page-btn icon-btn'}`} type="button" disabled={disabled} onClick={() => handleNav(text)}>
      <img className="nav-icon" src={icon} alt={text} />
    </button>
  );

  const renderPageNumber = page => (
    <Fragment>
      <input
        className="form-input"
        type="text"
        name="pageNumber"
        value={page}
        onChange={(e) => { onChangePage(e); }}
      />
    </Fragment>
  );

  const renderLimitDropdown = () => (
    <form>
      <label>
          Rows per page: &nbsp;
        <select className="select" value={limit} onChange={(e) => { onChangeRowCount(e); }}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </label>
    </form>
  );

  const renderPaginationPanel = (pages, page) => (
    <Fragment>
      <div className="pagination">
        <div className="center-item">
          <p>
            {`Page ${currentPage} of ${pages}`}
          </p>
        </div>
        {renderLimitDropdown()}
        <div className="page-panel">
          {renderButton(firstPageIcon, 'firstPage', handlePagination, (!(page > 1)))}
          {renderButton(prevPageIcon, 'previous', handlePagination, (!(page > 1)))}
          {renderPageNumber(page)}
          {renderButton(nextPageIcon, 'next', handlePagination, (!(page < pages)))}
          {renderButton(lastPageIcon, 'lastPage', handlePagination, (!(page < pages)))}
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {renderPaginationPanel(numberOfPages, currentPage)}
    </Fragment>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  handlePagination: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowCount: PropTypes.func.isRequired,
};
