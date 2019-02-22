import React from 'react';
import Filter from '../../../components/Filter/index';

describe('Filter Component', () => {
  
  let props; 
  let component;
  let componentInstance;

  beforeEach(() => {
    props = {
      filterSet: 'automationStatus',
      title: 'Automation Status',
      options: [],
      handleFilterChange: jest.fn(),
    };
    component = (() => shallow(<Filter {...props} />))();
    componentInstance = component.instance();
  });

  it('should render as expected', () => {
    expect(component).toMatchSnapshot();
  });

  describe('toggleVisibility method', () => {
    it('should be initially "FALSE"', () => {
      expect(component.state('filterOptionsIsVisible')).toBeFalsy();
    });
  
    it('should change the filterOptionsIsVisible in the state when called', () => {
      const newprops = {
        ...props,
        options: [{ type: null }],
      };
      const component = mount(<Filter {...newprops} />);
      component.find('.filter-title').simulate('click');
      expect(component.state('filterOptionsIsVisible')).toBeTruthy();
    });
  });

  describe('selectCheckBoxFilter method', () => {
    it(`should update the selectedFilters in the state by adding
    the selected filter and also call handleFilterChange
    `, () => {
      const event = { target: { value: 'failed_automations' } };
      expect(component.state('selectedFilters')).toEqual([]);
      props.handleFilterChange.mockReset();
      componentInstance.selectCheckBoxFilter(event);
      expect(component.state('selectedFilters')).toEqual(['failed_automations']);
      expect(props.handleFilterChange).toHaveBeenCalledTimes(1);
    });

    it(`should update the selectedFilters in the state by removing
    the selected filter and also call handleFilterChange`, () => {
      const event = { target: { value: 'failed_automations' } };
      component.setState({ selectedFilters: ['failed_automations'] });
      props.handleFilterChange.mockReset();
      componentInstance.selectCheckBoxFilter(event);
      expect(component.state('selectedFilters')).toEqual([]);
      expect(props.handleFilterChange).toHaveBeenCalledTimes(1);
    });

    it('should check for default selectedFilters', () => {
      const newprops = {
        ...props,
        options: [{ type: null }],
      };
      const component = mount(<Filter {...newprops} />);
      component.find('.filter-title').simulate('click');
      expect(component.find('.filter-options-isvisible').length).toBe(1);
    });
  });

  describe('selectDateFilter method', () => {
    it(`should call handleFilterChange with set_from_date argument
    if the datePickerID is 1`, () => {
      const date = '1/02/2018';
      const datePickerID = '1';
      props.handleFilterChange.mockReset();
      componentInstance.selectDateFilter(date, datePickerID);
      expect(props.handleFilterChange).toHaveBeenCalledWith(date, props.filterSet, 'set_from_date');
    });

    it(`should call handleFilterChange with set_to_date argument
    if the datePickerID is 2`, () => {
      const date = '1/02/2018';
      const datePickerID = '2';
      props.handleFilterChange.mockReset();
      componentInstance.selectDateFilter(date, datePickerID);
      expect(props.handleFilterChange).toHaveBeenCalledWith(date, props.filterSet, 'set_to_date');
    });
  });
});
