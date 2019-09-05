import React from 'react';
import configureStore from 'redux-mock-store';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Dashboard, { mapDispatchToProps } from '../../../components/Dashboard';

const options = new ReactRouterEnzymeContext();

describe('test dashboard', () => {
  const state = {};
  const props = {
    currentUser: {
      UserInfo: {
        firstName: 'David',
        lastName: 'Muhanguzi',
        picture: 'https://test-image.jpg',
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
    <Provider store={store}>
      <Dashboard {...props} />
    </Provider>,
    options.get(),
  );
  it('renders a header', () => {
    expect(wrapper.find('#header').length).toEqual(1);
  });

  it('should render the partners upselling card', () => {
    const upsellingCard = wrapper.find('.upSelling');
    const title = upsellingCard.find('.title');
    expect(title.text()).toEqual('Upselling Partners');
  });

  it('Test mapDispatch to props', () => {
    const dispatch = jest.fn();
    const expectedProps = mapDispatchToProps(dispatch);
    expectedProps.fetchUpdates();
    expect(dispatch).toHaveBeenCalled();
  });
});
