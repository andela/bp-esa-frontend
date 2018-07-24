import React, {Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/login';
import ReportPage from './components/reportPage';
import Navbar from './components/layout/navbar';
import Sidebar from './components/layout/sidebar';
import Footer from './components/layout/footer';
import { Row, Col} from 'reactstrap';

class App extends Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Row>
                  <Col sm={2}>
                    <Sidebar />
                  </Col>
                  <Col sm={10}>
                    <Route exact path="/" component={ReportPage} />
                  </Col>
                </Row>
              </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
