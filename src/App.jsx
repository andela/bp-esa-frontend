import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import ReportPage from './components/ReportPage';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={ReportPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
