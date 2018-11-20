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
    it('should change the filterOptionsIsVisible in the state', () => {
      const component = getComponent();
      const componentInstance = component.instance();
      expect(component.state('searchOptionsVisible')).toBeFalsy();
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
        searchValue: 'Andela',
        searchCriteria: 1,
      });
      expect(props.handleSearch).toHaveBeenCalled();
    });
  });
});
