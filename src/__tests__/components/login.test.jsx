import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import { doSignInWithGoogle } from '../../firebase';
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
  // eslint-disable-next-line prefer-const
  let user = {
    user: {
      email: { value: 'example@mail.com', match: () => true },
    },
  };
  it('should call onLogin()', () => {
    const renderedComponent = getComponent();
    const spy = jest.spyOn(renderedComponent.instance(), 'onLogin');
    doSignInWithGoogle.mockImplementationOnce(
      () => new Promise((resolve) => {
        resolve(user);
      }),
    );
    renderedComponent.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call onLogin() successfully', () => {
    const renderedComponent = getComponent();
    user.user.email.match = () => false;
    doSignInWithGoogle.mockImplementationOnce(() => new Promise(resolve => resolve(user)));
    const spy = jest.spyOn(renderedComponent.instance().props, 'setCurrentUser');
    renderedComponent.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call onLogin() error', () => {
    const renderedComponent = getComponent();
    user.user.email.match = () => false;
    doSignInWithGoogle.mockImplementationOnce(
      () => new Promise((resolve, reject) => reject(new Error('something is wrong'))),
    );
    const spy = jest.spyOn(renderedComponent.instance().props, 'setCurrentUser');
    renderedComponent.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
