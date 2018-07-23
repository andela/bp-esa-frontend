import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../../../components/layout/navbar';

it('renders without crashing', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toMatchSnapshot();
});
