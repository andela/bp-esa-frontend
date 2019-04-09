import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ReportPage } from '../../components/ReportPage';
import sampleReports from '../../fixtures/fixtures';

const mockStore = configureStore();

const state = {
  automation: {
    data: sampleReports.data,
    error: {},
    isLoading: false,
    pagination: sampleReports.pagination,
  },
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
    realTimeReport: [sampleReports.data],
  };
  let component;

  beforeEach(() => {
    component = mount(<ReportPage {...props} />);
  });

  it('should render as expected', () => {
    const title = component.find('.text');
    expect(title.text()).toEqual('ESA Dashboard');
  });

  describe('componenDidUpdate method', () => {
    it('should call componentDidUpdate method', () => {
      const componentDidMountMethod = jest.spyOn(ReportPage.prototype, 'componentDidMount');
      mount(
        <Provider store={store}>
          <ReportPage {...props} />
        </Provider>,
      );
      expect(componentDidMountMethod).toHaveBeenCalledTimes(1);
    });
  });

  it('should redirect to the AIS page when you click the fellow name', () => {
    // eslint-disable-next-line no-undef
    const wrapper = mount(<ReportPage {...props} />);

    wrapper.setState({ viewMode: 'listView' });
    const redirectToAIS = wrapper.find('.table-body')
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
    });
  });
});
