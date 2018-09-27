import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../components/login';

let props= {
  history: {},
};
let wrapper;

const getComponent = () => {
  if (!wrapper) {
    wrapper = shallow(<Login {...props} />);
  }
  return wrapper;
}

it('renders without crashing', () => {
  const component = getComponent();
  expect(component).toMatchSnapshot();
});

describe('onLogin() method', () => {
  it('should call onLogin()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'onLogin');
    renderedComponent.onLogin();
    expect(renderedComponent.onLogin.calledOnce).toEqual(true);
  });
});
