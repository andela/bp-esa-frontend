import React from 'react';
import DeveloperCardComponent from '../../../components/developerCards';


const props = {
  isLoading: false,
  openModal: jest.fn(),
  changeModalTypes: jest.fn(),
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
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DeveloperCardComponent {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render DeveloperCard correctly', () => {
    const cardContainer = wrapper.find('.cont');
    expect(cardContainer.length).toEqual(1);
  });


  it('should ensure developer profile is displayed', () => {
    expect(wrapper.find('.oval-1')).toBeTruthy();
  });

  it('should ensure status band turns to green when status is success', () => {
    const span = wrapper.find('#success');
    expect(span.text()).toEqual('SUCCESS');
  });

  it('should call openModal and changeModal props', () => {
    const infoIcon = wrapper.find('.info-cont').find('.info-icon').at(1);
    infoIcon.simulate('click');
    expect(props.openModal).toHaveBeenCalled();
    expect(props.changeModalTypes).toHaveBeenCalled();
  });
});
