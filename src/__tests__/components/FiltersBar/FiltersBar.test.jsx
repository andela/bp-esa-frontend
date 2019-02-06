import React from 'react';
import FiltersBar from '../../../components/FiltersBar';


const props = {
  filters: {
    tags: [
      {
        id: 1, text: 'Failed Automations', type: 'checkbox',
      },
      {
        id: 2, text: 'Successful Automations', type: 'checkbox',
      },
      {
        id: 3, text: 'Failed Slack Automations', type: 'checkbox',
      },
      {
        id: 4, text: 'Failed Email Automation', type: 'checkbox',
      },
      {
        id: 5, text: 'Failed Freckle Automation', type: 'checkbox',
      },
    ],
    automationStatus: ['FAILED_AUTOMATIONS'],
    automationType: ['failed_automations'],
    length: 1,
    date: {
      to: '21/04/2019',
      from: '26/05/2018',
    },
  },
};
const getComponent = () => mount(<FiltersBar {...props} />);

describe('Test addFilter tags', () => {
  it('test that it adds filter tags', () => {
    const renderComponent = getComponent();
    expect(renderComponent.find('.filter-scroll')).toBeDefined();
  });
});
