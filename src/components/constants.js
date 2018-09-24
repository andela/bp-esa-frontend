export const SUCCESSFUL_AUTOMATIONS = 'SUCCESSFUL_AUTOMATIONS';
export const FAILED_AUTOMATIONS = 'FAILED_AUTOMATIONS';
export const SUCCESSFUL_SLACK_AUTOMATIONS = 'SUCCESSFUL_SLACK_AUTOMATIONS';
export const SUCCESSFUL_EMAIL_AUTOMATIONS = 'SUCCESSFUL_EMAIL_AUTOMATIONS';
export const SUCCESSFUL_FRECKLE_AUTOMATIONS = 'SUCCESSFUL_FRECKLE_AUTOMATIONS';
export const FAILED_SLACK_AUTOMATIONS = 'FAILED_SLACK_AUTOMATIONS';
export const FAILED_EMAIL_AUTOMATIONS = 'FAILED_EMAIL_AUTOMATIONS';
export const FAILED_FRECKLE_AUTOMATIONS = 'FAILED_FRECKLE_AUTOMATIONS';


export const filters = [
  {
    id: 1,
    title: 'Automation Status',
    options: [
      { id: 1, text: 'Failed Automations', value: FAILED_AUTOMATIONS },
      { id: 2, text: 'Successful Automations', value: SUCCESSFUL_AUTOMATIONS },
      { id: 3, text: 'Failed Slack Automations', value: FAILED_SLACK_AUTOMATIONS },
      { id: 4, text: 'Failed Email Automation', value: FAILED_EMAIL_AUTOMATIONS },
      { id: 5, text: 'Failed Freckle Automation', value: FAILED_FRECKLE_AUTOMATIONS },
      { id: 6, text: 'Successful Slack Automations', value: SUCCESSFUL_SLACK_AUTOMATIONS },
      { id: 7, text: 'Successful Email Automation', value: SUCCESSFUL_EMAIL_AUTOMATIONS },
      { id: 8, text: 'Successful Freckle Automation', value: SUCCESSFUL_FRECKLE_AUTOMATIONS },
    ],
  },
];
