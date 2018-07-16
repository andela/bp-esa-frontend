import React from 'react';
import { shallow } from 'enzyme';
import FilterSearchForm from '../../components/filterSearchForm';

it('renders without crashing', () => {
    const wrapper = shallow(<FilterSearchForm />);
    expect(wrapper).toMatchSnapshot();
});
