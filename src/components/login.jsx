import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notify } from 'react-notify-toast';
import { doSignInWithGoogle } from '../firebase';

class Login extends Component {
  onLogin = () => {
    const { setCurrentUser, history } = this.props;
    doSignInWithGoogle().then((user, error) => {
      if (error) {
        notify.show('Unable to login with google!', 'error');
      } else if (user.user.email.match(/.*@andela.com$/)) {
        setCurrentUser(user);
        history.push('/');
        notify.show(`Hello ${user.user.displayName} ! You have Logged in Successfully!`, 'success');
      } else { notify.show('Login failed! Please login with your andela email!', 'error'); }
    });
  }

  render() {
    return (
      <div className="login_page">
        <div className="login_details">
          <div className="login_logo">
            <div>A</div>
            <img className="logo" src="/logo.png" alt="Andela Logo" />
          </div>
          <div className="login_title">
            <h1>ESA</h1>
          </div>
          <div className="login_link">
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={() => this.onLogin()}>
              <img src="/google.png" alt="google-icon" />
              <span>LOGIN TO GET STARTED</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  setCurrentUser: PropTypes.func,
  history: PropTypes.object.isRequired,
};

Login.defaultProps = {
  setCurrentUser: () => {},
};

export default Login;
