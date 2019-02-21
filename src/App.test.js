import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

let props;
let wrapper;

const getComponent = () => {
  if (!wrapper) {
    wrapper = shallow(<App {...props} />);
  }
  return wrapper;
}

describe('constructor() method', () => {
  it('should call the constructor()', () => {
    localStorage.setItem('state', JSON.stringify({authenticated: true,currentUser: null}));
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'constructor');
    expect(getComponent().state('authenticated')).toEqual(true)
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
    expect(getComponent().state('authenticated')).toEqual(false)
    // The empty object represents the user object
    renderedComponent.setCurrentUser({});
    expect(getComponent().state('authenticated')).toEqual(true);
  });
});

describe('removeCurrentUser() method', () => {
  it('should call removeCurrentUser()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'removeCurrentUser');
    getComponent().setState({authenticated: true});
    expect(getComponent().state('authenticated')).toEqual(true)
    renderedComponent.removeCurrentUser();
    expect(renderedComponent.removeCurrentUser.calledOnce).toEqual(true);
    expect(getComponent().state('authenticated')).toEqual(false)
  });
});
