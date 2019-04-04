import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ReportComponent, { ReportPage, mapDispatchToProps, mapStateToProps } from '../../components/ReportPage';

const sampleReports = {
  data: [
    {
      id: 1,
      fellowName: 'Tunmise, Sandile',
      partnerName: 'Andela',
      type: 'onboarding',
      slackAutomations: {
        status: 'failure',
        slackActivities: [14],
      },
      freckleAutomations: {
        status: 'failure',
        freckleActivities: [{
          projectId: 34,
          type: 'projectCreation',
          status: 'failure',
        }],
      },
      emailAutomations: {
        status: 'success',
        emailActivities: [10],
      },
      updatedAt: '2017-09-29 ',
    },
    {
      id: 2,
      fellowName: 'Shakira, Shakira',
      partnerName: 'ESA',
      type: 'offboarding',
      slackAutomations: {
        status: 'success',
        slackActivities: [14],
      },
      freckleAutomations: {
        status: 'success',
        freckleActivities: [{
          projectId: 34,
          type: 'projectCreation',
          status: 'failure',
        }],
      },
      emailAutomations: {
        status: 'success',
        emailActivities: [10],
      },
      updatedAt: '2018-09-29',
    },
  ],
  pagination: {
    currentPage: 1,
    numberOfPages: 6556,
    dataCount: '13112',
    nextPage: 2,
  },
};

const mockStore = configureStore();

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
    freckle: {
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

const state = {
  automation: {
    data: sampleReports.data,
    error: { error: '' },
    isLoading: false,
    pagination: sampleReports.pagination,
  },
  stats,
  error: {},
  isLoading: false,
};

const store = mockStore(state);

describe('ReportPage Component', () => {
  const props = {
    automation: {
      isLoading: false,
      data: sampleReports.data,
      pagination: sampleReports.pagination,
      error: {},
    },
    stats,
    location: { search: '?view=cardView' },
    currentUser: {
      additionalUserInfo: {
        profile: {
          name: '',
          picture: '',
        },
      },
    },
    history: { push: jest.fn() },
    removeCurrentUser: jest.fn(),
    formatDates: jest.fn(),
    fetchAllAutomation: jest.fn(() => Promise.resolve()),
    fetchUpdates: jest.fn(),
    resetUpdates: jest.fn(),
    fetchStat: jest.fn(),
    realTimeReport: sampleReports.data,
  };
  let component;

  beforeEach(() => {
    component = mount(<ReportPage {...props} />);
  });

  it('should render as expected', () => {
    const title = component.find('.text');
    expect(title.text()).toEqual('ESA Dashboard');
  });

  it('should redirect to the AIS page when you click the fellow name', () => {
    component.setState({ viewMode: 'listView' });
    const redirectToAIS = component.find('.table-body')
      .find('.report-table')
      .find('tbody')
      .find('tr')
      .find('.fellow')
      .at(0);

    global.open = jest.fn();
    redirectToAIS.simulate('click');
    expect(global.open).toHaveBeenCalled();
  });

  describe('render view', () => {
    it('should render view of listCard', () => {
      component.setState({ viewMode: 'listView' });
      const tableBody = component.find('.table-body');
      expect(tableBody.html()).toContain('onboarding');
      component.setState({ reportData: sampleReports.data, isLoadingReports: false });

      const infoButton = component
        .find('.fa-info-circle')
        .at(0);

      infoButton.simulate('click');
      component.find('.modal-close-button-group').simulate('click');
      expect(component.instance().state.isModalOpen).toEqual(false);
    });

    it('should render automation modal view of cardView', () => {
      component.setState({
        reportData: sampleReports.data,
        isLoadingReports: false,
        viewMode: 'cardView',
      });
      const infoIcon = component
        .find('.card').at(0)
        .find('.info-cont')
        .find('.info-icon')
        .at(0);

      infoIcon.simulate('click');
      component.find('.modal-close-button-group').simulate('click');
      expect(component.instance().state.isModalOpen).toEqual(false);
    });

    describe('render view', () => {
      it('should render view of listCard', () => {
        const tableBody = component.find('.table-body').find('.report-table');
        expect(tableBody).toBeDefined();
      });

      it('should render list', () => {
        const viewButton = component
          .find('.report-navbar-container')
          .find('.right-navbar')
          .find('#list-icon');
        viewButton.simulate('click');
        expect(component.state().viewMode).toEqual('listView');
      });
    });

    describe('The mapStateToProps', () => {
      it('should return the expected props object', () => {
        const storeState = {
          stats: {
            isLoading: false,
            data: {},
            error: {},
          },
        };

        const expectedProps = mapStateToProps(storeState);
        expect(expectedProps.stats).toEqual(storeState.stats);
      });
    });

    describe('The mapDispatchToProps', () => {
      it('should ensure that fetchStat is mapped to props', () => {
        const dispatch = jest.fn();
        const expectedProps = mapDispatchToProps(dispatch);

        expectedProps.fetchStat();
        expect(dispatch).toHaveBeenCalled();
      });
    });
  });

  describe('Test component methods', () => {
    it('should handle update tab', () => {
      const updateTab = component.find('.update-tab');
      updateTab.simulate('click');
      expect(props.resetUpdates).toHaveBeenCalled();
    });

    it('should handle page navigation', () => {
      const nextPageBtn = component.find('.page-btn').first();
      nextPageBtn.simulate('click');
      expect(props.fetchAllAutomation).toHaveBeenCalled();
      const tableBody = component.find('.table-body').find('.report-table');
      expect(tableBody).toBeDefined();
    });

    it('should render list', () => {
      const viewButton = component
        .find('.report-navbar-container')
        .find('.right-navbar')
        .find('#list-icon');
      viewButton.simulate('click');
      expect(component.state().viewMode).toEqual('listView');
    });
  });
});
