import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../../components/landingPage';

it('renders without crashing', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper).toMatchSnapshot();
});
