import React from 'react';
import { shallow } from 'enzyme';
import SideBar from '../../../components/layout/sidebar';

it('renders without crashing', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper).toMatchSnapshot();
});
