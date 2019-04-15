import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { notify } from 'react-notify-toast';
import { doSignOut } from '../../firebase';
import './styles.scss';

class Header extends PureComponent {
  state = {
    signoutDropDownIsVisible: false,
  };

  componentDidMount() {
    document.body.addEventListener('click', this.clickAway);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.clickAway);
  }

  clickAway = (event) => {
    if (event.target.getAttribute('data-toggle') !== 'signout-dropdown-toggler') {
      this.setState({ signoutDropDownIsVisible: false });
    }
  };

  toggleSignoutDropDown = () => this.setState(prevState => (
    { signoutDropDownIsVisible: !prevState.signoutDropDownIsVisible }));

  onLogout = async () => {
    const { removeCurrentUser, history } = this.props;
    const error = await doSignOut();
    if (error) {
      return notify.show('Unable to logout!', 'error');
    }
    removeCurrentUser();
    history.push('/login');
    notify.show('You have Logged out Successfully!', 'success');
  };

  render() {
    const { signoutDropDownIsVisible } = this.state;
    const { currentUser } = this.props;
    const {
      additionalUserInfo: {
        profile: { name, picture },
      },
    } = currentUser;

    const [firstName, secondName] = name.split(' ');
    let initials = '';
    if (firstName && secondName) {
      initials = `${firstName[0]}${secondName[0]}`;
    }
    return (
      <div id="header" ref={(node) => { this.node = node; }}>
        <div className="brand">
          <a href="/">
            <div className="header-logo"><img src="/logo.png" alt="Andela Logo" /></div>
            <span className="text">ESA Dashboard</span>
          </a>
        </div>
        <div
          className="user-info-container"
          data-toggle="signout-dropdown-toggler"
          onClick={this.toggleSignoutDropDown}
        >
          <div
            className="current-user"
            data-toggle="signout-dropdown-toggler"
          >
            <div
              className="user-name"
              data-initials={initials}
              data-name={name}
              data-toggle="signout-dropdown-toggler"
            />
            <div
              className="image-container"
              data-toggle="signout-dropdown-toggler"
            >
              {picture ? (
                <img
                  src={picture}
                  alt="user-icon"
                  className="user-image"
                  data-toggle="signout-dropdown-toggler"
                />
              ) : (
                <i
                  className="fa fa-user-circle"
                  data-toggle="signout-dropdown-toggler"
                />
              )}
            </div>
          </div>
          <div
            className={classNames('caret-down', { visible: signoutDropDownIsVisible })}
            data-toggle="signout-dropdown-toggler"
          >
            <i className="fa fa-caret-down" data-toggle="signout-dropdown-toggler" />
            <div className={classNames('signout-dropdown-parent', { visible: signoutDropDownIsVisible })}>
              <div className={classNames('signout-dropdown', { visible: signoutDropDownIsVisible })}>
                <button type="button" className="logout-button" onClick={() => this.onLogout()}>
                  <i className="fa fa-sign-out-alt" />
                  <span>Sign Out</span>
                </button>
              </div>
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
