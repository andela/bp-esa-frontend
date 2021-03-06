import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
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
    return false;
  };

  userInfo = () => {
    const { signoutDropDownIsVisible } = this.state;
    const {
      currentUser: {
        UserInfo: {
          firstName,
          lastName,
          picture,
        },
      },
    } = this.props;

    let initials = '';
    if (firstName && lastName) {
      initials = `${firstName[0]}${lastName[0]}`;
    }
    return (
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
            data-name={`${firstName} ${lastName}`}
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
    );
  };

  navigationPills = () => {
    const { activeTab } = this.props;
    const active = tabName => (activeTab === tabName ? 'active' : '');
    return (
      <div className="pills">
        {/* dashboard pill */}
        <div className={`nav-links ${active('dashboard')}`}>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        {/* automations pill */}
        <div className={`nav-links ${active('automations')}`}>
          <Link to="/">Automations</Link>
        </div>
        {/* user pill */}
        {this.userInfo()}
      </div>
    );
  };

  render() {
    return (
      <div id="header" ref={(node) => { this.node = node; }}>
        <div className="brand">
          <Link to="/">
            <div className="header-logo"><img src="/logo.png" alt="Andela Logo" /></div>
            <span className="text">ESA</span>
          </Link>
        </div>
        {this.navigationPills()}
      </div>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
  removeCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
  activeTab: PropTypes.string,
};

Header.defaultProps = {
  removeCurrentUser: () => {},
  activeTab: 'automations',
};

export default Header;
