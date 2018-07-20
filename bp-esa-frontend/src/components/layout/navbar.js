import React, { Component } from 'react';
import logo from '../../images/logo.png';
import { Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

class NavBar extends Component {
  render() {
    return(
        <Row className="navbar">
            <Col sm={2}><div className="logo"><img src={logo} alt="logo" /></div></Col>
            <Col sm={6}>
                {/* This should dynamically change according to the present active page. */}
                <h1>[Application] Report</h1>
            </Col>
            <Col sm={2}>
                <div className="user_image">
                    <FontAwesomeIcon icon={faUser} size='4x'/>
                </div>
            </Col>
            <Col sm={2}><button>LOGOUT</button></Col>
        </Row>
    );
  }  
}
export default NavBar;
