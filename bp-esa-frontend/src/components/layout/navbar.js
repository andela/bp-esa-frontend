import React, { Component } from 'react';
import logo from '../../images/logo.png';
import { Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

class NavBar extends Component {
    pageName = () => {
        const pathName = window.location.pathname;
        let pageTitle;
        switch (pathName){
            case '/':
                pageTitle = 'DASHBOARD';
                break;
            case '/slack-report':
                pageTitle = 'SLACK INTEGRATIONS REPORT';
                break;
            case '/freckle-report':
                pageTitle = 'FRECKLE INTEGRATIONS REPORT';
                break;
            case '/email-report':
                pageTitle = 'EMAIL NOTIFICATIONS REPORT';
                break;
            case '/overview':
                pageTitle = 'ENGAGEMENT ON/OFF-BOARDING OVERVIEW';
                break;
            default:
                pageTitle = '';
        }
        return (<h1>{pageTitle}</h1>);
    }

    render() {      
        return(
            <Row className="navbar">
                <Col sm={2}><div className="logo"><img src={logo} alt="logo" /></div></Col>
                <Col sm={6}>
                    {this.pageName()}
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
