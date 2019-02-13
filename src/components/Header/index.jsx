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
          <a href="/">
            <img className="logo" src="/logo.png" alt="Andela Logo" />
            <span className="text">ESA Reporting</span>
          </a>
        </div>
        <div className="signout">
          <div>
            <span className="user-name">
            Hello,&nbsp;
              { name }
            !
            </span>
          </div>
          <div className="image-container" onClick={this.toggleSignoutDropDown}>
            { picture
              ? <img src={picture} alt="user-icon" className="user-image" />
              : <i className="fa fa-2x fa-user-circle" />
            }
            <i className="fa fa-caret-down custom" />
            <div
              className={classNames('signout-dropdown', { visible: signoutDropDownIsVisible })}
            >
              <button type="button" className="logout-button" onClick={() => this.onLogout()}>
                <i className="fa fa-sign-out-alt" />&nbsp;
                <span>Sign Out</span>
              </button>
            </div>
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
