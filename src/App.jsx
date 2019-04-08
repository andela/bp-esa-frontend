import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Cookies from 'cookies-js';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import Notifications, { notify } from 'react-notify-toast';
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
      const userState = {
        authenticated: true,
        currentUser: user,
      };
      localStorage.setItem('state', JSON.stringify(userState));
      this.setState(userState);
    } else {
      this.removeCurrentUser();
    }
  }

  removeCurrentUser = () => {
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    localStorage.removeItem('state');
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
              render={props => ((authenticated === true)
                ? <Redirect to="/" /> : <Login {...props} />)}
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
