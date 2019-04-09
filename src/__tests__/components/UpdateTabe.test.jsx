import React from 'react';
import { shallow } from 'enzyme';
import UpdateTab from '../../components/UpdateTab';

describe('Update Tab', () => {
  const props = {
    numberOfItems: 1,
    handleUpdates: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UpdateTab {...props} />);
  });

  it('should render component successfully', () => {
    expect(wrapper.find('.update-tab')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the handleUpdates method', () => {
    wrapper.find('.update-tab').simulate('click');
    expect(props.handleUpdates).toHaveBeenCalled();
  });
});
