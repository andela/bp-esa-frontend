import React from 'react';
import { notify } from 'react-notify-toast';
import sinon from 'sinon';
import { doSignOut } from '../../firebase';
import Header from '../../components/Header';

jest.mock('../../firebase');
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
    renderedComponent.find('.logout-button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call onLogout() error', async () => {
    await doSignOut.mockImplementationOnce(
      () => new Promise((resolve) => {
        resolve('Some error');
      }),
    );
    const header = new Header(props);
    const notifyError = await header.onLogout();
    expect(typeof notifyError === 'function').toEqual(true);
  });
});

describe('toggleSignoutDropDown() method', () => {
  it('should call toggleSignoutDropDown()', () => {
    const event = { preventDefault: () => {} };
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'toggleSignoutDropDown');
    renderedComponent.toggleSignoutDropDown(event);
    expect(renderedComponent.toggleSignoutDropDown.calledOnce).toEqual(true);
    expect(getComponent().state().signoutDropDownIsVisible).toEqual(true);
  });

  it('sign out button should close on clicking away', () => {
    const component = mount(<Header {...props} />);
    component.setState({ signoutDropDownIsVisible: true });
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    document.body.dispatchEvent(event);
    component.update();
    expect(component.find('.visible').length).toBe(0);
  });
});
