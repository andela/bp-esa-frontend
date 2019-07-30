import React from 'react';
import { shallow } from 'enzyme';
import ReportNavBar from '../../../components/ReportNavBar';
import Dropdown from "../../../components/StatsCard/Dropdown";

const props = {
  renderView: jest.fn,
  isStats: true,
  fetchStat: jest.fn,
};

const getComponent = () => shallow(<ReportNavBar  {...props} />);
describe('ReportNavBar', () => {
  it('should render as expected', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it('should render Dropdown component', () => {
    expect(getComponent().find(Dropdown)).toHaveLength(1)
  });

});
