import React from 'react';
import { mount } from 'enzyme';
import ReportNavBar from '../../../components/ReportNavBar';

const getComponent = () => mount(<ReportNavBar renderView={() => {}} />);

describe('ReportNavBar', () => {
  it('should render as expected', () => {
    expect(getComponent()).toMatchSnapshot();
  });
});
