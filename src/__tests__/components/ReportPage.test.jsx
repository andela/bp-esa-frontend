import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ReportComponent, { ReportPage } from '../../components/ReportPage';

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
      freckleActivities: [12],
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
      freckleActivities: [12],

    },
    emailAutomations: {
      status: 'success',
      emailActivities: [10],

    },
    updatedAt: '2018-09-29',
  },
];

const state = {
  automation: { data: sampleReports, error: {error: ''}, isLoading: false },
};
const mockStore = configureStore();
const store = mockStore(state);


const props = {
  automation: { data: sampleReports, error: {}},
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
  fetchAllAutomation: jest.fn(),
};

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
    it('should render view of listCard', () => {
      const component = mount(<ReportPage {...props} />);
      component.setState({ viewMode: 'listView' });
      const tableBody = component.find('.table-body');
      expect(tableBody.html()).toContain('onboarding');
    });

    it('should render list', () => {
      const component = mount(<ReportPage {...props} />);
      component.find('#list-icon').simulate('click');
      expect(component.instance().state.viewMode).toEqual('listView');
    });
  });
});
