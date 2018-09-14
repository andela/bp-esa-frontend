import React from 'react';
import { shallow } from 'enzyme';
import ReportPage from '../../components/reportPage';

it('renders without crashing', () => {
    const wrapper = shallow(<ReportPage />);
    expect(wrapper).toMatchSnapshot();
});
