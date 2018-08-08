import React from 'react';
import { shallow } from 'enzyme';
import ReportsTables from '../../components/reportsTables';

const props = {
    path: '',
    filterCriteria: [],
    tableData: {
        tableData: {
            tableHead: [],
            tableBody: []
        }
    }
}

it('renders without crashing', () => {
    const wrapper = shallow(<ReportsTables {...props}/>);
    expect(wrapper).toMatchSnapshot();
});
