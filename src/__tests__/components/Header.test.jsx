import React from 'react';
import * as firebase from '../../firebase';
import Header from '../../components/Header';

let props = {
  currentUser: {
    additionalUserInfo: {
      profile: {
        name: '',
        picture: ''
      }
    }
  },
  history: {}
};
let wrapper;

const getComponent = () => {
  if (!wrapper) {
    wrapper = shallow(<Header {...props} />);
  }
  return wrapper;
}

it('should render as expected', () => {
  const component = getComponent();
  expect(component).toMatchSnapshot();
});

describe('onLogout() method', () => {
  it('should call onLogout()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'onLogout');
    renderedComponent.onLogout();
    expect(renderedComponent.onLogout.calledOnce).toEqual(true);
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
