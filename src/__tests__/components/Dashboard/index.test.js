import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Dashboard from '../../../components/Dashboard';

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
  const wrapper = mount(
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <Dashboard {...props} />
    </Provider>,
  );
  it('renders a header', () => {
    expect(wrapper.find('#header').length).toEqual(1);
  });

  it('should render the partners upselling card', () => {
    const upsellingCard = wrapper.find('.upselling');
    const title = upsellingCard.find('.title');
    expect(title.text()).toEqual('Upselling Partners');
  });
});
