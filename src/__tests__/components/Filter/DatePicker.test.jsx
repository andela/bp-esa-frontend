import React from 'react';
import moment from 'moment';
import DatePicker from '../../../components/Filter/DatePicker';

const props = {
  handleChange: jest.fn(),
  id: '1',
};
let wrapper;

const getComponent = () => {
  if (!wrapper) {
    wrapper = shallow(<DatePicker {...props} />);
  }
  return wrapper;
};

describe('<DatePicker />', () => {
  it('should render as expected', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  describe('onChange Method', () => {
    it(`should set the selected date in the state
    and also call handleChange`, () => {
      const date = moment();
      const component = getComponent();
      const componentInstance = component.instance();
      expect(component.state('selectedDate')).toBeNull();
      props.handleChange.mockReset();
      componentInstance.onChange(date);
      expect(component.state('selectedDate')).toEqual(date);
      expect(props.handleChange).toHaveBeenCalledTimes(1);
    });
  });
});
