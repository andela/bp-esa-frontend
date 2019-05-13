import React from 'react';
import { mount } from 'enzyme';
import Dashboard from '../../../components/Dashboard';

describe('test dashboard', () => {
  it('renders a card', () => {
    // eslint-disable-next-line react/jsx-filename-extension
    const wrapper = mount(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
