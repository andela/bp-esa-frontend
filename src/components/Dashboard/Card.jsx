import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  static propTypes = {
    classes: PropTypes.string.isRequired,
    title: PropTypes.string,
    component: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    const {
      classes, title, component,
    } = this.props;
    return (
      <div className={`dashboard-card ${classes}`}>
        <div className="title">
          {title}
        </div>
        {
          component()
        }
      </div>
    );
  }
}

export default Card;
