import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notify } from 'react-notify-toast';
import { doSignInWithGoogle } from '../../firebase';
import './styles.scss';

class Login extends Component {
  onLogin = () => {
    const { setCurrentUser, history } = this.props;
    doSignInWithGoogle().then((user) => {
      if (user.user.email.match(/.*@andela.com$/)) {
        setCurrentUser(user);
        history.push('/');
        notify.show(`Hello ${user.user.displayName} ! You have Logged in Successfully!`, 'success');
      } else {
        notify.show('Login failed! Please login with your andela email!', 'error');
      }
    })
      .catch((error) => {
        if (error) {
          notify.show('Unable to login with google!', 'error');
        }
      });
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="top-blue">
            <div className="andela-logo">
              <h1 className="a">A</h1>
              <img className="logo" src="/logo.png" alt="Andela Logo" />
            </div>
            <h1 className="engagement-support-automation">Engagement Support Automation</h1>
            <h1 className="sign-in-to-get-started">Sign in to get started</h1>
          </div>
          <div className="bottom-white">
            <button type="button" className="sign-in-button-container" onClick={() => this.onLogin()}>
              <img className="google-logo" src="/google.png" alt="google-icon" />
              <span className="sign-in-with-google">Sign in with Google</span>
            </button>
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
