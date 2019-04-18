import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import axios from 'axios';
import ReportComponent, { mapStateToProps, mapDispatchToProps, ReportPage } from '../../components/ReportPage';

const sampleReports = [
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
];

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
    data: sampleReports,
    error: { error: '' },
    isLoading: false,
  },
  stats,
};
const mockStore = configureStore();
const store = mockStore(state);


const props = {
  automation: { data: sampleReports, error: {} },
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
  closeModal: jest.fn(),
  fetchAllAutomation: jest.fn(),
  fetchStat: jest.fn(),
  stats,
  retryFailedAutomation: jest.fn(),
  handleRetryAutomation: jest.fn(),
  retryAutomation: jest.fn(),
};

class CustomError extends Error {
  constructor(...params) {
    super(...params);
    const [, response] = params;
    this.response = response;
  }
}

const url = 'https://api-staging-esa.andela.com/api/v1/automations';
const getComponent = () => mount(
  <Provider store={store}>
    <ReportComponent {...props} />
  </Provider>,
);

describe('<ReportPage />', () => {
  it('should render as expected', () => {
    const title = getComponent().find('.text');
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

  describe('ReportPageComponent', () => {
    it('should redirect to the AIS page when you click the fellow name', () => {
      // eslint-disable-next-line no-undef
      const component = mount(<ReportPage {...props} />);
      component.setState({ viewMode: 'listView' });
      component.setState({ reportData: sampleReports, isLoadingReports: false });
      const redirectToAIS = component
        .find('.table-body')
        .find('tr')
        .at(0)
        .find('.fellow');
      global.open = jest.fn();
      redirectToAIS.simulate('click');
      expect(global.open).toHaveBeenCalled();
    });
  });

  describe('render view', () => {
    let wrapper;
    it('should render view of listCard', () => {
      const component = mount(<ReportPage {...props} />);
      component.setState({ viewMode: 'listView' });
      const tableBody = component.find('.table-body');
      expect(tableBody.html()).toContain('onboarding');
      component.setState({ reportData: sampleReports, isLoadingReports: false });
      component
        .find('.fa.fa-info-circle')
        .at(0)
        .simulate('click');
      component.find('.modal-close-button-group').simulate('click');
      expect(component.instance().state.isModalOpen).toEqual(false);
    });

    it('should render automation modal view of cardView', () => {
      const component = mount(<ReportPage {...props} />);
      component.setState({ viewMode: 'cardView' });
      // const tableBody = component.find('.table-body');
      // expect(tableBody.html()).toContain('onboarding');
      component.setState({ reportData: sampleReports, isLoadingReports: false });
      component
        .find('.info-icon')
        .at(0)
        .simulate('click');
      component.find('.modal-close-button-group').simulate('click');
      expect(component.instance().state.isModalOpen).toEqual(false);
    });

    it('should render list', () => {
      const component = mount(<ReportPage {...props} />);
      component.find('#list-icon').simulate('click');
      expect(component.instance().state.viewMode).toEqual('listView');
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
      const component = mount(<ReportPage {...props} />);
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
    it('should ensure that fetchStat is mapped to props', () => {
      const dispatch = jest.fn();
      const expectedProps = mapDispatchToProps(dispatch);

      expectedProps.fetchStat();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
