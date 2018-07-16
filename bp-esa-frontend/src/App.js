import React, {Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
              <Row>
                <Col sm={2}>
                  <Sidebar />
                </Col>
                <Col sm={10}>
                  <Switch>
                    <Route path="/" component={ReportPage} />
                  </Switch>
                </Col>
              </Row>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
