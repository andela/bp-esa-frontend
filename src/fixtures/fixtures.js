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
      updatedAt: '2017-09-29 ',
    },
  ],
  pagination: {
    currentPage: 1,
    numberOfPages: 6556,
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
