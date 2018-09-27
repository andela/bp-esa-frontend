import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { notify } from 'react-notify-toast';
import { doSignOut } from '../../firebase';
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

  onLogout = () => {
    const { removeCurrentUser, history } = this.props;
    doSignOut().then((error) => {
      if (error) {
        notify.show('Unable to logout!', 'error');
      } else {
        removeCurrentUser();
        history.push('/login');
        notify.show('You have Logged out Successfully!', 'success');
      }
    });
  }

  render() {
    const { signoutDropDownIsVisible } = this.state;
    const { currentUser } = this.props;
    const { additionalUserInfo: { profile: { name, picture } } } = currentUser;
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
          <span className="user-name">
            Hello,&nbsp;
            { name }
            !
          </span>
          <a href="#" onClick={this.toggleSignoutDropDown}>
            { picture
              ? <img src={picture} alt="user-icon" className="user-image" />
              : <i className="fa fa-2x fa-user-circle" />
            }
            <i className="fa fa-caret-down custom" />
          </a>
          <div
            className={classNames('signout-dropdown', { visible: signoutDropDownIsVisible })}
          >
            <a href="#" onClick={() => this.onLogout()}>
              <i className="fa fa-sign-out-alt" />&nbsp;
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
  removeCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
};

Header.defaultProps = {
  removeCurrentUser: () => {},
};

export default Header;
