import React from 'react';
import { mount } from 'enzyme';
import Card from '../../../components/Dashboard/Card';

describe('Dashboard card', () => {
  let wrapper;
  const props = {
    classes: 'class',
    title: 'Title Card',
    component: jest.fn(),
  };
  beforeEach(() => {
    wrapper = mount(<Card {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('renders appropriately', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders dashboard card with title if provided', () => {
    const card = wrapper.find('.dashboard-card');
    const className = wrapper.find('.class');
    expect(card.length).toEqual(1);
    expect(className.length).toEqual(1);
    expect(card.text()).toEqual('Title Card');
  });
});
