import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Notifications, { notify } from 'react-notify-toast';
import Cookies from 'cookies-js';
import jwtDecode from 'jwt-decode';
import Login from './components/Login';
import ReportPage from './components/ReportPage';
import Dashboard from './components/Dashboard';

const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (authenticated === true ? <Component {...props} {...rest} /> : <Redirect to="/login" />)
    }
  />
);

AuthenticatedRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.any.isRequired,
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: {},
    };
  }

  componentDidMount() {
    this.checkAuthorization();
  }

  checkAuthorization = () => {
    const token = Cookies.get('jwt-token');
    if (token) {
      const userDetails = this.decodeToken(token);
      if (userDetails) {
        this.setCurrentUser(userDetails);
      }
    }
  }

  decodeToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.UserInfo.email.match(/.*@andela.com$/)) {
        return decodedToken;
      }
      return notify.show('Please use your Andela Email to Login', 'error');
    } catch (err) {
      return false;
    }
  }

  setCurrentUser = (user) => {
    if (user) {
      const sessionState = {
        authenticated: true,
        currentUser: user,
      };
      localStorage.setItem('state', JSON.stringify(sessionState));
      this.setState(sessionState);
    } else {
      this.removeCurrentUser();
    }
  };

  removeCurrentUser = () => {
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    localStorage.removeItem('state');
    Cookies.expire('jwt-token');
  };

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
              render={props => ((authenticated === true)
                ? <Redirect to="/" /> : <Login {...props} />)}
            />
            <AuthenticatedRoute
              path="/dashboard"
              authenticated={authenticated}
              component={Dashboard}
              currentUser={currentUser}
            />
            <AuthenticatedRoute
              exact
              path="/"
              component={ReportPage}
              authenticated={authenticated}
              currentUser={currentUser}
              removeCurrentUser={this.removeCurrentUser}
            />
            <AuthenticatedRoute
              exact
              path="/dashboard"
              component={Dashboard}
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
