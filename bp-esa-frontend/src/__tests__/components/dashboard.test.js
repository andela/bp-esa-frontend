import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../../components/dashboard';

const props = {
    match: { path: ''},
    filterCriteria: []
}

it('renders without crashing', () => {
    const wrapper = shallow(<Dashboard {...props}/>);
    expect(wrapper).toMatchSnapshot();
});
