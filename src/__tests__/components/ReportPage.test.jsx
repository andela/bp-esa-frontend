/* global mount */
import React from 'react';
import configureStore from 'redux-mock-store';
import ReportComponent, { ReportPage, mapDispatchToProps, mapStateToProps } from '../../components/ReportPage';
import { sampleReports, stats } from '../../fixtures/fixtures';

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

const mockStore = configureStore();
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
    retryFailedAutomation: jest.fn,
  };
  let component;

  beforeEach(() => {
    component = mount(<ReportPage {...props} />);
  });

  afterEach(() => {
    component.unmount();
  })

  it('should render as expected', () => {
    const title = component.find('.text');
    expect(title.text()).toEqual('ESA');
  });

  it('should redirect to the AIS page when you click the engineer\'s name', () => {
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

  it('updates the page limit', () => {
    const { pagination, filters } = component.state();
    const limitSelection = component.find('.select');
    limitSelection.simulate('change', { target: { value: 25 } });
    expect(component.state('pagination').limit).toEqual(25);
    expect(props.fetchAllAutomation).toHaveBeenCalledWith(pagination, filters);
  });

  it('updates the current page state when user types in the input box', () => {
    const currentPageInput = component.find('.form-input');
    currentPageInput.simulate('change', { target: { value: 30 } });
    expect(component.state('tempCurrentPage')).toEqual(30);
  });

  describe('render view', () => {
    let wrapper;
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

    describe('render view', () => {
      it('should render card view', () => {
        const viewButton = component
          .find('.report-navbar-container')
          .find('.report-navbar')
          .find('#card-icon');
        viewButton.simulate('click');
        expect(component.state().viewMode).toEqual('cardView');
      });

      it('should render list', () => {
        const viewButton = component
          .find('.report-navbar-container')
          .find('.report-navbar')
          .find('#list-icon');
        viewButton.simulate('click');
        expect(component.state().viewMode).toEqual('listView');
      });
    });

    it('should call handleRetryAutomation for the card view', () => {
      wrapper = mount(<ReportPage {...props} />);
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleRetryAutomation');
      const button = wrapper.find('#retry-automation');
      button.simulate('click');
      // eslint-disable-next-line no-unused-expressions
      expect(instance.handleRetryAutomation).toBeCalled;
    });

    it('should call handleRetryAutomation for the table modal view', () => {
      component.setState({ viewMode: 'listView' });
      component.setState({ reportData: sampleReports, isLoadingReports: false });
      const instance = component.instance();
      jest.spyOn(instance, 'handleRetryAutomation');
      component.find('#info-icon')
        .at(0)
        .simulate('click');
      const button = component.find('.retry-btn');
      button.simulate('click');
      // eslint-disable-next-line no-unused-expressions
      expect(instance.handleRetryAutomation).toBeCalled;
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
    let dispatch;
    let expectedProps;

    beforeEach(() => {
      dispatch = jest.fn();
      expectedProps = mapDispatchToProps(dispatch);
    });

    it('should ensure that fetchStat is mapped to props', () => {
      expectedProps.fetchStat();
      expect(dispatch).toHaveBeenCalled();
    });

    it('should ensure that fetchAllAutomation is mapped to props', () => {
      expectedProps.fetchAllAutomation();
      expect(dispatch).toHaveBeenCalled();
    });

    it('should ensure that fetchUpdates is mapped to props', () => {
      expectedProps.fetchUpdates();
      expect(dispatch).toHaveBeenCalled();
    });

    it('should ensure that resetUpdates is mapped to props', () => {
      expectedProps.resetUpdates();
      expect(dispatch).toHaveBeenCalled();
    });

    it('should ensure that fetchStat is mapped to props', () => {
      expectedProps.fetchStat();
      expect(dispatch).toHaveBeenCalled();
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
  });
});
