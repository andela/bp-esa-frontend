import React from 'react';
import ReportPage from '../../components/ReportPage';

let props = {
  currentUser: {},
  history: {},
}
it('should render as expected', () => {
  const wrapper = shallow(<ReportPage {...props} />);
  expect(wrapper).toMatchSnapshot();
});
