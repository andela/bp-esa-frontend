import React from 'react';
import { shallow } from 'enzyme';
import Filters from '../../components/filters';

const props = {
    filterCriteria: []
}
it('renders without crashing', () => {
    const wrapper = shallow(<Filters {...props} />);
    expect(wrapper).toMatchSnapshot();
});
