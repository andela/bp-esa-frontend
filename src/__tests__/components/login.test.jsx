import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import { doSignInWithGoogle } from '../../firebase';
import Login from '../../components/Login';

jest.mock('../../firebase');

const props = {
  location: {
    search: 'url=theToken',
  },
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
    renderedComponent.find('.sign-in-button-container').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should redirect to the Andela API', () => {
    const redirectUrl = `${process.env.REACT_APP_ANDELA_AUTH_HOST}/login?redirect_url=${process.env.REACT_APP_URL}`;
    window.location.replace = jest.fn();
    wrapper.find('.sign-in-button-container').simulate('click');
    expect(window.location.replace).toHaveBeenCalledWith(redirectUrl);
  });
});
