const automationData = {
  data: [
    {
      id: 13112,
      fellowId: '91510507-0f1a-4d01-92c7-795b7c0331e4',
      fellowName: 'Delmer, Gleichner',
      partnerId: '-KXGyJcC1oimjQgFj184',
      partnerName: 'Nitzsche, Johnston and Dicki',
      type: 'onboarding',
      createdAt: '2019-04-10T15:25:45.830Z',
      updatedAt: '2019-04-10T15:25:45.830Z',
      slackAutomations: {
        status: 'failure',
        slackActivities: [
          {
            status: 'success',
            statusMessage: 'p-nitzschejohnsto-int slack channel created',
            type: 'create',
            channelId: 'GHRT0M0RE',
            channelName: 'p-nitzschejohnsto-int',
            slackUserId: null,
          },
          {
            status: 'success',
            statusMessage: 'p-nitzschejohnstonand slack channel created',
            type: 'create',
            channelId: 'GHKHNFXPT',
            channelName: 'p-nitzschejohnstonand',
            slackUserId: null,
          },
          {
            status: 'failure',
            statusMessage: 'An API error occurred: not_in_group',
            type: 'kick',
            channelId: 'GFY9CRYNT',
            channelName: 'available-developers',
            slackUserId: null,
          },
          {
            status: 'success',
            statusMessage: 'valentine.mayaki@andela.com invited to channel',
            type: 'invite',
            channelId: 'GFWF81D16',
            channelName: 'rack-city',
            slackUserId: 'UFTPSTE72',
          },
          {
            status: 'success',
            statusMessage: 'valentine.mayaki@andela.com invited to channel',
            type: 'invite',
            channelId: 'GHKHNFXPT',
            channelName: 'p-nitzschejohnstonand',
            slackUserId: 'UFTPSTE72',
          },
        ],
      },
      emailAutomations: {
        status: 'failure',
        emailActivities: [],
      },
      freckleAutomations: {
        status: 'failure',
        freckleActivities: [
          {
            status: 'failure',
            statusMessage: 'Request failed with status code 403',
            type: 'projectAssignment',
            freckleUserId: null,
            projectId: null,
          },
          {
            status: 'failure',
            statusMessage: 'Request failed with status code 403',
            type: 'projectCreation',
            freckleUserId: null,
            projectId: null,
          },
        ],
      },
    },
    {
      id: 13111,
      fellowId: 'b1a75af1-a90e-44b2-bd68-fa021656b709',
      fellowName: 'Reymundo, Graham',
      partnerId: '-KXGyJcC1oimjQgFj184',
      partnerName: 'Muller Inc',
      type: 'onboarding',
      createdAt: '2019-04-10T15:25:44.067Z',
      updatedAt: '2019-04-10T15:25:44.067Z',
      slackAutomations: {
        status: 'failure',
        slackActivities: [
          {
            status: 'success',
            statusMessage: 'ppascal.sibomana@gmail.com kicked from channel',
            type: 'kick',
            channelId: 'GFY9CRYNT',
            channelName: 'available-developers',
            slackUserId: 'UFX296TMH',
          },
          {
            status: 'failure',
            statusMessage: 'An API error occurred: name_taken',
            type: 'create',
            channelId: null,
            channelName: 'p-muller',
            slackUserId: null,
          },
          {
            status: 'failure',
            statusMessage: 'An API error occurred: name_taken',
            type: 'create',
            channelId: null,
            channelName: 'p-muller-int',
            slackUserId: null,
          },
          {
            status: 'failure',
            statusMessage: 'An API error occurred: channel_not_found',
            type: 'invite',
            channelId: null,
            channelName: null,
            slackUserId: null,
          },
          {
            status: 'success',
            statusMessage: 'ppascal.sibomana@gmail.com invited to channel',
            type: 'invite',
            channelId: 'GFWF81D16',
            channelName: 'rack-city',
            slackUserId: 'UFX296TMH'
          },
        ],
      },
      emailAutomations: {
        status: 'failure',
        emailActivities: [],
      },
      freckleAutomations: {
        status: 'failure',
        freckleActivities: [
          {
            status: 'failure',
            statusMessage: 'Request failed with status code 403',
            type: 'projectAssignment',
            freckleUserId: null,
            projectId: null,
          },
          {
            status: 'failure',
            statusMessage: 'Request failed with status code 403',
            type: 'projectCreation',
            freckleUserId: null,
            projectId: null,
          },
        ],
      },
    },
  ],
  pagination: {
    currentPage: 1,
    numberOfPages: 6556,
    dataCount: '13112',
    nextPage: 2,
  },
};

export default automationData;
