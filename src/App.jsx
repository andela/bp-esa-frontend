import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import Login from './components/Login';
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
    var userState = localStorage.getItem('state');
    if (userState) {
      userState = JSON.parse(userState);
      this.state = userState;
    } else {
      this.state = {
        authenticated: false,
        currentUser: null,
      }
    }
  }

  setCurrentUser = (user) => {
    if (user) {
      var sessionState = {
        authenticated: true,
        currentUser: user,
      }
      localStorage.setItem('state', JSON.stringify(sessionState));
      this.setState(sessionState);
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
              render={props => ((authenticated === true) ?
                <Redirect to="/" /> : <Login setCurrentUser={this.setCurrentUser} {...props} />)}
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
