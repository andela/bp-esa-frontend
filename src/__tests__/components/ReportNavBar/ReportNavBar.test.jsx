import React from 'react';
import { shallow } from 'enzyme';
import ReportNavBar from '../../../components/ReportNavBar';

const getComponent = () => shallow(<ReportNavBar />);

describe('ReportNavBar', () => {
  it('should render as expected', () => {
    expect(getComponent()).toMatchSnapshot();
  });
});
