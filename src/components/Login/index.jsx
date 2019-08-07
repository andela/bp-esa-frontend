import React, { Component } from 'react';
import Cookies from 'cookies-js';
import PropTypes from 'prop-types';
import './styles.scss';

class Login extends Component {
  componentDidMount() {
    const { location: { search }, history } = this.props;
    if (search && search.length > 0) {
      const token = search.split('=')[1];
      Cookies.set('jwt-token', token);
      history.push('/');
    }
  }

  onLogin = () => {
    const url = `${process.env.REACT_APP_ANDELA_AUTH_HOST}/login?redirect_url=${process.env.REACT_APP_URL}`;
    window.location.replace(url);
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-inner-container">
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
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Login;
