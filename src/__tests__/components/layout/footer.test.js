import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/layout/footer';

it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
});
