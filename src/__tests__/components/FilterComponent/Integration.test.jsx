/* global mount sinon */

import React from 'react';
import axios from 'axios';
import URL from 'url';
import ReportPage from '../../../components/ReportPage';
import FilterDropdown, {
  emailAutomations,
  freckleAutomations,
  slackAutomations,
} from '../../../components/FilterComponent/FilterDropdown';
import FilterComponent, { filterInitialState } from '../../../components/FilterComponent';

jest.mock('axios');
const axiosGetMock = jest.fn().mockResolvedValue({});
axios.get = axiosGetMock;

const filterSpy = sinon.spy(ReportPage.prototype, 'filter');
const historyMock = { push: jest.fn() };
const currentUserMock = {
  additionalUserInfo: {
    profile: {
      name: 'Mock User',
      picture: 'https://img.mock',
    },
  },
};


describe('Filter Component Integration', () => {
  let reportPage;
  beforeAll(() => {
    reportPage = mount(<ReportPage currentUser={currentUserMock} history={historyMock} />);
  });

  beforeEach(() => {
    axiosGetMock.mockReset();
    filterSpy.resetHistory();
    reportPage.update();
  });

  it('should render the filter component', () => {
    expect(reportPage.find(FilterComponent)).toHaveLength(1);
  });
  it('should call the filter function when the filters are applied', () => {
    reportPage.find('div.filter-button').simulate('click');
    expect(reportPage.find(FilterDropdown)).toHaveLength(1);
    reportPage.find('form.filter-box').simulate('submit');

    const [arg] = filterSpy.lastCall.args;
    expect(arg).toEqual({ ...filterInitialState, showFilterDropdown: true });
    expect(axiosGetMock).toHaveBeenCalledTimes(1);
    const [[url]] = axiosGetMock.mock.calls;
    const { query } = URL.parse(url, true);
    expect(query).toHaveProperty(emailAutomations);
    expect(query).toHaveProperty(freckleAutomations);
    expect(query).toHaveProperty(slackAutomations);
    expect(query).toHaveProperty('searchTerm');
    expect(query).toHaveProperty('searchBy');
    expect(query).toHaveProperty('type');
    expect(query).toHaveProperty('date[from]');
    expect(query).toHaveProperty('date[to]');
  });
});
