/* global mount sinon */

import React from 'react';
import axios from 'axios';
import { ReportPage } from '../../../components/ReportPage';
import FilterDropdown from '../../../components/FilterComponent/FilterDropdown';
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
const mockAutomations = {
  data: [],
  error: {},
  isLoading: false,
  pagination: {
    currentPage: 1,
    numberOfPages: 1,
    dataCount: '0',
  },
};
const stats = {
  isLoading: false,
  data: {
    automation: {
      success: 1,
      total: 191,
    },
    onboarding: {
      success: 1,
      total: 191,
    },
    offboarding: {
      success: 1,
      total: 191,
    },
    noko: {
      success: 1,
      total: 191,
    },
    slack: {
      success: 1,
      total: 191,
    },
    email: {
      success: 1,
      total: 191,
    },
  },
  error: {},
};

const fetchAllAutomationMock = jest.fn();

describe('Filter Component Integration', () => {
  let reportPage;
  beforeAll(() => {
    reportPage = mount(<ReportPage
      currentUser={currentUserMock}
      history={historyMock}
      automation={mockAutomations}
      fetchAllAutomation={fetchAllAutomationMock}
      location={{ search: '?view=listView' }}
      fetchStat={() => {}}
      stats={stats}
      retryFailedAutomation={jest.fn()}
    />);
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
    expect(arg).toEqual(filterInitialState);
    expect(fetchAllAutomationMock).toHaveBeenCalledWith(
      { currentPage: 1, limit: 10 },
      filterInitialState,
    );
  });
});
