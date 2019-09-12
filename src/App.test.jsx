import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { notify } from 'react-notify-toast';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import App, { AuthenticatedRoute } from './App';
import Dashboard from './components/Dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // eslint-disable-next-line react/jsx-filename-extension
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

let props;
let wrapper;

// Tokens belonging to Jane Doe, a fictional andelan
const randomAndelaToken =	'jwt-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySW5mbyI6eyJpZCI6Ii10aGVJZCIsImZpcnN0X25hbWUiOiJKYW5lIiwibGFzdF9uYW1lIjoiRG9lIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqYW5lLmRvZUBhbmRlbGEuY29tIiwibmFtZSI6IkphbmUgRG9lIiwicGljdHVyZSI6InRoZVBob3RvIiwicm9sZXMiOnsiRmVsbG93IjoiLWZlbGxvd1JvbGUiLCJBbmRlbGFuIjoiLWFuZGVsYW5Sb2xlIn19LCJpYXQiOjE1NjMxMzc1NjksImV4cCI6MTQ3NjIwMTY4NSwiYXVkIjoiYW5kZWxhLmNvbSIsImlzcyI6ImFjY291bnRzLmFuZGVsYS5jb20ifQ.u2OcvFKgrCKuYECVs7p2XoGLq6wY-7mEFpW26psgnoA';
const randomGmailToken =	'jwt-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySW5mbyI6eyJpZCI6Ii10aGVJZCIsImZpcnN0X25hbWUiOiJKYW5lIiwibGFzdF9uYW1lIjoiRG9lIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqYW5lLmRvZUBnbWFpbC5jb20iLCJuYW1lIjoiSmFuZSBEb2UiLCJwaWN0dXJlIjoidGhlUGhvdG8iLCJyb2xlcyI6eyJGZWxsb3ciOiItZmVsbG93Um9sZSIsIkFuZGVsYW4iOiItYW5kZWxhblJvbGUifX0sImlhdCI6MTU2MzEzNzU2OSwiZXhwIjoxNDc2MjAxNjg1LCJhdWQiOiJhbmRlbGEuY29tIiwiaXNzIjoiYWNjb3VudHMuYW5kZWxhLmNvbSJ9.cf1gcz1vQPhnw-Vn20HzS0yc4UC4XEoDO_L30xvluHI';

const getComponent = () => {
  if (!wrapper) {
    wrapper = shallow(<App {...props} />);
  }
  return wrapper;
};

describe('constructor() method', () => {
  it('should call the constructor()', () => {
    localStorage.setItem('state', JSON.stringify({ authenticated: true, currentUser: null }));
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: randomAndelaToken,
    });
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'constructor');
    expect(getComponent().state('authenticated')).toEqual(true);
  });
});

describe('setCurrentUser() method', () => {
  it('should call setCurrentUser() and setState', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'setCurrentUser');
    expect(renderedComponent.setCurrentUser.calledOnce).toEqual(false);
    // Without the user object
    renderedComponent.setCurrentUser();
    expect(renderedComponent.setCurrentUser.calledOnce).toEqual(true);
    expect(getComponent().state('authenticated')).toEqual(false);
    // The empty object represents the user object
    renderedComponent.setCurrentUser({});
    expect(getComponent().state('authenticated')).toEqual(true);
  });
});

describe('removeCurrentUser() method', () => {
  afterEach(() => {
    getComponent()
      .instance()
      .setCurrentUser.restore();
  });

  it('should call removeCurrentUser()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'removeCurrentUser');
    getComponent().setState({ authenticated: true });
    expect(getComponent().state('authenticated')).toEqual(true);
    renderedComponent.removeCurrentUser();
    expect(renderedComponent.removeCurrentUser.calledOnce).toEqual(true);
    expect(getComponent().state('authenticated')).toEqual(false);
  });
});

describe.only('checkAuthorization() method', () => {
  afterEach(() => {
    getComponent()
      .instance()
      .setCurrentUser.restore();
  });

  it('should pass user details to the setCurrentUser method', () => {
    const renderedComponent = getComponent().instance();
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: randomAndelaToken,
    });
    sinon.spy(renderedComponent, 'setCurrentUser');
    renderedComponent.checkAuthorization();
    expect(renderedComponent.setCurrentUser.calledOnce).toEqual(true);
  });

  it('should not pass user details to the setCurrentUser method if the token is wrong', () => {
    const renderedComponent = getComponent().instance();
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'jwt-token=wrongToken',
    });
    sinon.spy(renderedComponent, 'setCurrentUser');
    expect(renderedComponent.setCurrentUser.calledOnce).toEqual(false);
  });
});

describe('decodeToken() method', () => {
  afterEach(() => {
    getComponent().unmount();
  });
  it('should not return a dedcoded token when an non Andela email is used for login', () => {
    notify.show = jest.fn();
    const renderedComponent = getComponent().instance();
    renderedComponent.decodeToken(randomGmailToken);
    expect(notify.show).toBeCalled();
  });
});

describe('Authenticate route', () => {
  it('should run the authenticated route component', () => {
    const authenticateRouteWrapper = mount(
      <BrowserRouter>
        <AuthenticatedRoute path="/dashboard" authenticated component={Dashboard} />
      </BrowserRouter>,
    );
    expect(authenticateRouteWrapper).toMatchSnapshot();
  });
});
