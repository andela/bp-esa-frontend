import React, { Component } from 'react';

class Login extends Component {
  onLogin = () => {
    const url = `https://api-prod.andela.com/login?redirect_url=${process.env.REACT_APP_URL}`;
    window.location.replace(url);
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
            <a className="loginUrl" href="#" onClick={() => this.onLogin()}>
              <img src="/google.png" alt="google-icon" />
              <span>LOGIN TO GET STARTED</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
