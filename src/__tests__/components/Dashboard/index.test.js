import React from 'react';
import configureStore from 'redux-mock-store';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Dashboard from '../../../components/Dashboard';

const options = new ReactRouterEnzymeContext();

describe('test dashboard', () => {
  const state = {};
  const props = {
    currentUser: {
      additionalUserInfo: {
        profile: {
          name: 'kevin koech',
          picture: '',
        },
      },
    },
    removeCurrentUser: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };
  const mockStore = configureStore();
  const store = mockStore(state);
  it('renders a header', () => {
    const wrapper = mount(
      // eslint-disable-next-line react/jsx-filename-extension
      <Provider store={store}>
        <Dashboard {...props} />
      </Provider>,
      options.get(),
    );
    expect(wrapper.find('#header').length).toEqual(1);
  });
});
