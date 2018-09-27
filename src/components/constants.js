export const SUCCESSFUL_AUTOMATIONS = 'SUCCESSFUL_AUTOMATIONS';
export const FAILED_AUTOMATIONS = 'FAILED_AUTOMATIONS';
export const SUCCESSFUL_SLACK_AUTOMATIONS = 'SUCCESSFUL_SLACK_AUTOMATIONS';
export const SUCCESSFUL_EMAIL_AUTOMATIONS = 'SUCCESSFUL_EMAIL_AUTOMATIONS';
export const SUCCESSFUL_FRECKLE_AUTOMATIONS = 'SUCCESSFUL_FRECKLE_AUTOMATIONS';
export const FAILED_SLACK_AUTOMATIONS = 'FAILED_SLACK_AUTOMATIONS';
export const FAILED_EMAIL_AUTOMATIONS = 'FAILED_EMAIL_AUTOMATIONS';
export const FAILED_FRECKLE_AUTOMATIONS = 'FAILED_FRECKLE_AUTOMATIONS';
export const ONBOARDING = 'ONBOARDING';
export const OFFBOARDING = 'OFFBOARDING';


export const filters = [
  {
    id: 1,
    title: 'Automation Status',
    filterSet: 'automationStatus',
    options: [
      {
        id: 1, text: 'Failed Automations', value: FAILED_AUTOMATIONS, type: 'checkbox',
      },
      {
        id: 2, text: 'Successful Automations', value: SUCCESSFUL_AUTOMATIONS, type: 'checkbox',
      },
      {
        id: 3, text: 'Failed Slack Automations', value: FAILED_SLACK_AUTOMATIONS, type: 'checkbox',
      },
      {
        id: 4, text: 'Failed Email Automation', value: FAILED_EMAIL_AUTOMATIONS, type: 'checkbox',
      },
      {
        id: 5, text: 'Failed Freckle Automation', value: FAILED_FRECKLE_AUTOMATIONS, type: 'checkbox',
      },
      {
        id: 6, text: 'Successful Slack Automations', value: SUCCESSFUL_SLACK_AUTOMATIONS, type: 'checkbox',
      },
      {
        id: 7, text: 'Successful Email Automation', value: SUCCESSFUL_EMAIL_AUTOMATIONS, type: 'checkbox',
      },
      {
        id: 8, text: 'Successful Freckle Automation', value: SUCCESSFUL_FRECKLE_AUTOMATIONS, type: 'checkbox',
      },
    ],
  },
  {
    id: 3,
    title: 'Automation Type',
    filterSet: 'automationType',
    options: [
      {
        id: 1, text: 'Onboarding', value: ONBOARDING, type: 'checkbox',
      },
      {
        id: 2, text: 'Offboarding', value: OFFBOARDING, type: 'checkbox',
      },
    ],
  },
  {
    id: 2,
    title: 'Date',
    filterSet: 'date',
    options: [
      {
        id: 1, text: 'From', type: 'date',
      },
      {
        id: 2, text: 'To', type: 'date',
      },
    ],
  },
];
