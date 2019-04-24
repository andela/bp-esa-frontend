import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const UpdateTab = ({ numberOfItems, handleUpdates, view }) => (
  <div>
    <button type="button" className={`update-tab ${view === 'cardView' && 'card-width'}`} onClick={handleUpdates}>
    Load new updates &nbsp;[
      {numberOfItems}
]
    </button>
  </div>
);

UpdateTab.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
  handleUpdates: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};

export default UpdateTab;
