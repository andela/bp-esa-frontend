import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import PropTypes from 'prop-types';
import Login from './components/login';
import ReportPage from './components/ReportPage';

const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        (authenticated === true) ? <Component {...props} {...rest} /> : <Redirect to="/login" />)
    }
  />
);

AuthenticatedRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.any.isRequired,
};

class App extends React.PureComponent {
  state = {
    authenticated: false,
    currentUser: null,
  }

  setCurrentUser = (user) => {
    if (user) {
      this.setState({
        authenticated: true,
        currentUser: user,
      });
    } else {
      this.removeCurrentUser();
    }
  }

  removeCurrentUser = () => {
    this.setState({
      authenticated: false,
      currentUser: null,
    });
  }

  render() {
    const { authenticated, currentUser } = this.state;
    return (
      <div>
        <Notifications />
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/login"
              render={props => (<Login setCurrentUser={this.setCurrentUser} {...props} />)}
            />
            <AuthenticatedRoute
              exact
              path="/"
              component={ReportPage}
              authenticated={authenticated}
              currentUser={currentUser}
              removeCurrentUser={this.removeCurrentUser}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
