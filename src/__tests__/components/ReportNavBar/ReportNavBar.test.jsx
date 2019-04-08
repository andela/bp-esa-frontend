import React from 'react';
import { shallow } from 'enzyme';
import ReportNavBar from '../../../components/ReportNavBar';



describe('ReportNavBar', () => {
  let getComponent;
  const filterMock = jest.fn();
  beforeAll(() => {
    getComponent = () => shallow(<ReportNavBar filter={filterMock} />);
  });
  it('should render as expected', () => {
    expect(getComponent()).toMatchSnapshot();
  });
});
