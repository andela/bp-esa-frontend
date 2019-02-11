import React from 'react';
import { notify } from 'react-notify-toast';
import * as firebase from '../../firebase';
import Header from '../../components/Header';

const props = {
  currentUser: {
    additionalUserInfo: {
      profile: {
        name: '',
        picture: '',
      },
    },
  },
  removeCurrentUser: jest.fn(),
  history: {
    push: jest.fn(),
  },
};
let wrapper;

const getComponent = () => {
  if (!wrapper) {
    wrapper = shallow(<Header {...props} />);
  }
  return wrapper;
};

it('should render as expected', () => {
  const component = getComponent();
  expect(component).toMatchSnapshot();
});

describe('onLogout() method', () => {
  const renderedComponent = mount(<Header {...props} />);
  Object.defineProperty(notify, 'show', { value: () => jest.fn(), writable: true });
  it('should call onLogout()', () => {
    const spy = jest.spyOn(renderedComponent.instance(), 'onLogout');
    renderedComponent.find('#sign-out').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call onLogout() error', () => {
    Object.defineProperty(firebase, 'doSignOut', { value: () => (Promise.resolve(new Error('Some error'))) });
    const spy = jest.spyOn(renderedComponent.instance().props, 'removeCurrentUser');
    renderedComponent.find('#sign-out').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});

describe('toggleSignoutDropDown() method', () => {
  it('should call toggleSignoutDropDown()', () => {
    const event = { preventDefault: () => {} };
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'toggleSignoutDropDown');
    renderedComponent.toggleSignoutDropDown(event);
    expect(renderedComponent.toggleSignoutDropDown.calledOnce).toEqual(true);
    expect(getComponent().state().signoutDropDownIsVisible).toEqual(true)
  });
});
