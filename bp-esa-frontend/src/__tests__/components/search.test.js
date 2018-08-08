import React from 'react';
import { shallow } from 'enzyme';
import Search from '../../components/search';

it('renders without crashing', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper).toMatchSnapshot();
});
