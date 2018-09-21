import React from 'react';
import ReportPage from '../../components/ReportPage';

it('should render as expected', () => {
  const wrapper = shallow(<ReportPage />);
  expect(wrapper).toMatchSnapshot();
});
