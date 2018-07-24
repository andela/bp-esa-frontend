import React from 'react';
import { shallow } from 'enzyme';
import FilterSearchForm from '../../components/filterSearchForm';

const props = {
    filterCriteria: []
}

it('renders without crashing', () => {
    const wrapper = shallow(<FilterSearchForm  {...props}/>);
    expect(wrapper).toMatchSnapshot();
});
