import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import Login from '../../components/login';

jest.mock('../../firebase');

const props = {
  history: {
    push: jest.fn(),
  },
  setCurrentUser: jest.fn(),
};
let wrapper;

const getComponent = () => {
  if (!wrapper) {
    wrapper = shallow(<Login {...props} />);
  }
  return wrapper;
};

it('renders without crashing', () => {
  const component = getComponent();
  expect(component).toMatchSnapshot();
});

describe('onLogin() method', () => {
  Object.defineProperty(notify, 'show', { value: () => jest.fn(), writable: true });
  it('should call onLogin()', () => {
    const renderedComponent = getComponent();
    const spy = jest.spyOn(renderedComponent.instance(), 'onLogin');
    renderedComponent.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should redirect to the Andela API', () => {
    const redirectUrl = `https://api-prod.andela.com/login?redirect_url=${process.env.REACT_APP_URL}`;
    window.location.replace = jest.fn();
    wrapper.find('.loginUrl').simulate('click');
    expect(window.location.replace).toHaveBeenCalledWith(redirectUrl);
  });
});
