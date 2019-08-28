import moment from 'moment';

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
      nokoAutomations: {
        status: 'failure',
        nokoActivities: [{
          projectId: 34,
          type: 'projectCreation',
          status: 'failure',
        }],
      },
      emailAutomations: {
        status: 'success',
        emailActivities: [10],
      },
      updatedAt: moment('2017-09-29', 'YYYY-MM-DD'),
    },
    {
      id: 8631,
      fellowId: '07a88f54-d195-4431-bb14-5b287826188f',
      email: 'uchesuber@gmail.com',
      fellowName: 'Alta, Willms',
      partnerId: '-KXGyJcC1oimjQgFj18Q',
      partnerName: 'Accounteer',
      type: 'offboarding',
      createdAt: '2019-07-15T09:03:18.558Z',
      updatedAt: '2019-07-15T09:03:18.558Z',
      slackAutomations: {
        status: 'success',
        slackActivities: [
          {
            id: 21294,
            status: 'success',
            statusMessage: 'uchesuber@gmail.com kicked from channel',
            type: 'kick',
            channelId: 'GKQHNTD0C',
            channelName: 'client-accounteer',
            slackUserId: 'UJD3ALBK6',
          },
          {
            id: 21293,
            status: 'success',
            statusMessage: 'uchesuber@gmail.com invited to channel',
            type: 'invite',
            channelId: 'CJFG3JWCX',
            channelName: 'available-developers',
            slackUserId: 'UJD3ALBK6',
          },
        ],
      },
      emailAutomations: {
        status: 'success',
        emailActivities: [
          {
            id: 10435,
            status: 'success',
            statusMessage: 'Email sent succesfully',
            recipient: 'example@andela.com',
            subject: 'Alta, Willms Placed with Accounteer',
          },
          {
            id: 10436,
            status: 'success',
            statusMessage: 'Email sent succesfully',
            recipient: 'example@andela.com',
            subject: 'Alta, Willms Engagement Roll Off (Lake Micah)',
          },
        ],
      },
      nokoAutomations: {
        status: 'failure',
        nokoActivities: [],
      },
    },
  ],
  pagination: {
    currentPage: 1,
    numberOfPages: 6556,
    dataCount: '13112',
    nextPage: 2,
  },
  newPagination: {
    currentPage: 1,
    numberOfPages: 1,
    dataCount: '13112',
    nextPage: 2,
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

export { sampleReports, stats };
