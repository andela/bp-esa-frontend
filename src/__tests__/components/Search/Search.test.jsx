import React from 'react';
import Search from '../../../components/Search';

const props = {
  handleSearch: jest.fn(),
};

const getComponent = () => shallow(<Search {...props} />);


describe('<Search />', () => {
  it('should render as expected', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  describe('toggleVisibility method', () => {
    it('should initially set the searchOptionsVisible to "FALSE"', () => {
      const component = (() => shallow(<Search {...props} />))();
      expect(component.state('searchOptionsVisible')).toBeFalsy();
    })

    it("should change the searchOptionsVisible in the state", () => {
      const mountedComponent = mount(<Search {...props} />);
      const mountedComponentInstance = mountedComponent.instance();
      const isVisible = mountedComponent.state('searchOptionsVisible');
      mountedComponentInstance.toggleVisibility();
      expect(isVisible).not.toEqual(mountedComponent.state("searchOptionsVisible"));
    });
    
    it('should change the searchOptionsVisible in the state when dropdown is clicked', () => {
      const component = (() => mount(<Search {...props} />))();
      component.find('.search-title').simulate('click');
      expect(component.state('searchOptionsVisible')).toBeTruthy();
    });

    it('should have a single instance of optionSet in Search dropdown', () => {
      const component = mount(<Search {...props} />);
      component.find('.search-title').simulate('click');
      expect(component.find('.search-options-isvisible').length).toBe(1);
    });
    
    it('should close dropdown options when user clicks away', () => {
      const newprops = {...props, options: [{ type: null }]};
      const component = mount(<Search {...newprops} />);
      component.find('.search-title').simulate('click');
      document.body.click();
      expect(component.state('searchOptionsVisible')).toBeFalsy();
    });

    it('should open dropdown when called', () => {
      const newprops = {...props, options: [{ type: null }]};
      const component = mount(<Search {...newprops} />);
      const componentInstance = component.instance();
      componentInstance.toggleVisibility();
      expect(component.state('searchOptionsVisible')).toBeTruthy();
    });

  });

  describe('handleSearch method', () => {
    it(`should render the search options
    `, () => {
      const component = getComponent();
      expect(component.state('searchValue')).toEqual('');
      expect(component.state('searchCriteria')).toEqual(1);
      component.setState({
        searchCriteria: 1,
      });
      component.setState({
        searchValue: 'Andela',
      });
      expect(props.handleSearch).toHaveBeenCalled();
    });

    it('should call handleSearchCriteriaChange', () => {
      const component = getComponent();
      component.find('input[name="search"]').last().simulate('change');
      expect(component.state().searchCriteria).toBe(2);
      component.find('input[name="search"]').first().simulate('change');
      expect(component.state().searchCriteria).toBe(1);
    });

    it('should call handleSearchValueChange', () => {
      const component = getComponent();
      const event = {
        preventDefault: jest.fn(),
        target: {
          value: 'Somevalue',
        },
      };
      component.find('.search-input').simulate('change', event);
      expect(component.state().searchValue).toBe('Somevalue');
    });
  });
});
