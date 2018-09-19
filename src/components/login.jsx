import React from 'react';
import logo from '../images/logo.png';
import google from '../images/google.png';

const Login = () => (
  <div className="login_page">
    <div className="login_details">
      <div className="login_logo">
        <div>A</div>
        <img className="logo" src={logo} alt="Andela Logo" />
      </div>
      <div className="login_title">
        <h1>ESA</h1>
      </div>
      <div className="login_link">
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <a href="#">
          <img src={google} alt="andela-logo" />
          <span>LOGIN TO GET STARTED</span>
        </a>
      </div>
    </div>
  </div>
);

export default Login;
