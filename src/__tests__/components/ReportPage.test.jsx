import React from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import ReportPage from '../../components/ReportPage';

const props = {
  currentUser: {
    UserInfo: {
      firstName: 'Jane',
      lastName: 'Doe',
      picture: 'https://test-image.jpg',
    },
  },
  history: {},
  removeCurrentUser: jest.fn(),
  formatDates: jest.fn(),
};

const sampleReports = [
  {
    id: 1,
    fellowName: 'Tunmise',
    partnerName: 'Andela',
    type: 'onboarding',
    slackAutomations: {
      status: 'failure',
      slackActivities: [
        {
          channelName: 'andela-int',
          type: 'Addition',
          status: 'failure',
        },
        {
          channelName: 'andela',
          type: 'Removal',
          status: 'success',
        },
      ],
    },
    freckleAutomations: {
      status: 'failure',
    },
    emailAutomations: {
      status: 'failure',
    },
    updatedAt: '2017-09-29 ',
  },
  {
    id: 2,
    fellowName: 'Shakira',
    partnerName: 'ESA',
    type: 'offboarding',
    slackAutomations: {
      status: 'success',
    },
    freckleAutomations: {
      status: 'success',
    },
    emailAutomations: {
      status: 'success',
    },
    updatedAt: '2018-09-29',
  },
];

const pagination = {
  pagination: {
    currentPage: 1,
    numberOfPages: 722,
    dataCount: 7212,
    nextPage: 2,
  },
};
class CustomError extends Error {
  constructor(...params) {
    super(...params);
    const [, response] = params;
    this.response = response;
  }
}

const getComponent = () => shallow(<ReportPage {...props} />);

describe('<ReportPage />', () => {
  beforeAll(() => {
    Object.defineProperty(notify, 'show', { value: () => jest.fn(), writable: true });
  });
  it('should render as expected', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  describe('querying the backend', () => {
    it('should get allocations from the backend', async () => {
      Object.defineProperty(axios, 'get', {
        value: () => new Promise(resolve => resolve(
          { data: { data: sampleReports, pagination } },
        )),
      });
      const component = await getComponent();
      const spy = jest.spyOn(component.instance(), 'componentDidMount');
      await component.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });
    it('should set state reportData to error response when fails to get allocations', async () => {
      const errorResponse = {
        type: 'networkError',
      };
      Object.defineProperty(axios, 'get', {
        value: () => new Promise((resolve, reject) => reject(
          new CustomError('Failed to get allocations', errorResponse),
        )),
      });
      const component = await getComponent();
      await component.instance().componentDidMount();
      expect(component.instance().state.reportData).toEqual([]);
    });
  });
});
