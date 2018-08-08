import React from 'react';
import { shallow } from 'enzyme';
import ReportPage from '../../components/reportPage';

const props = {
    match: { path: ''},
    filterCriteria: [],
}

it('renders without crashing', () => {
    const wrapper = shallow(<ReportPage {...props}/>);
    expect(wrapper).toMatchSnapshot();
});
