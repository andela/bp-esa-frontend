import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './styles.scss';

class Header extends PureComponent {
  state = {
    signoutDropDownIsVisible: false,
  }

  toggleSignoutDropDown = (event) => {
    event.preventDefault();
    const { signoutDropDownIsVisible } = this.state;
    this.setState({
      signoutDropDownIsVisible: !signoutDropDownIsVisible,
    });
  }

  render() {
    const { signoutDropDownIsVisible } = this.state;
    return (
      <div id="header">
        <div className="brand">
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <a href="#">
            <img className="logo" src="/logo.png" alt="Andela Logo" />
            <span className="text">ESA Reporting</span>
          </a>
        </div>
        <div className="signout">
          <a href="#" onClick={this.toggleSignoutDropDown}>
            <i className="fa fa-2x fa-user-circle" />
          </a>
          <div
            className={classNames('signout-dropdown', { visible: signoutDropDownIsVisible })}
          >
            <i className="fa fa-sign-out-alt" />&nbsp;
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
