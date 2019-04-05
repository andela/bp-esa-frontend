import React from 'react';
import DeveloperCardComponent from '../../../components/developerCards';


const props = {
  data: [{
    id: '10516',
    emailAutomations: { emailActivities: [13] },
    fellowName: 'Reyes, Kozey',
    freckleAutomations: { status: 'success', freckleActivities: [14] },
    partnerName: "Hammes, O'Keefe and Hilll",
    slackAutomations: { status: 'failure', slackActivities: [7] },
  }],
  isLoading: false,
  retryingAutomation: false,
  handleRetryAutomation: jest.fn(),
};

describe('rendering', () => {
  it('should render DeveloperCard correctly', () => {
    const wrapper = mount(<DeveloperCardComponent {...props} />);
    const cardContainer = wrapper.find('.cont');
    expect(cardContainer.length).toEqual(1);
  });


  it('should ensure developer profile is displayed', () => {
    const wrapper = mount(<DeveloperCardComponent {...props} />);
    expect(wrapper.find('.oval-1')).toBeTruthy();
  });
  it('should ensure status band turns to green when status is success', () => {
    const wrapper = mount(<DeveloperCardComponent {...props} />);
    const span = wrapper.find('#success');
    expect(span.text()).toEqual('SUCCESS');
  });
});
