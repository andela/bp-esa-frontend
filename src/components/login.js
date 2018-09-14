import React, { Component } from 'react';
import logo from '../images/logo.png';
import google from '../images/google.png';

class Login extends Component {
    render() {
        return (
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
                        <a href="#" >
                            <img src={google} />
                            <span>LOGIN TO GET STARTED</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
