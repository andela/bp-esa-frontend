import React from 'react';
import { mount } from 'enzyme';
import DeveloperCardComponent from '../../../components/developerCards';


const props = {
  isLoading: false,
  openModal: jest.fn(),
  changeModalTypes: jest.fn(),
  data: [{
    id: '10516',
    emailAutomations: { emailActivities: [13] },
    fellowName: 'Reyes, Kozey',
    nokoAutomations: { status: 'success', nokoActivities: [14] },
    partnerName: "Hammes, O'Keefe and Hilll",
    slackAutomations: {
      status: 'failure',
      slackActivities: [
        {
          status: 'failure',
          statusMessage:
        'An API error occurred: channel_not_found',
          type: 'invite',
          channelId: null,
          channelName: null,
        },
        {
          status: 'failure',
          statusMessage:
        'An API error occurred: channel_not_found',
          type: 'kick',
          channelId: null,
          channelName: null,
        }],
    },
  }],
  retryingAutomation: false,
  handleRetryAutomation: jest.fn(),
};

describe('rendering', () => {
  let wrapper;

  beforeEach(() => {
    // eslint-disable-next-line react/jsx-filename-extension
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

  it('should display success / total ', () => {
    const stat = wrapper.find('.status-container > div > span');
    expect(stat.at(0).contains('0/2')).toEqual(true);
    expect(stat.at(1).contains('0/1')).toEqual(true);
  });

  it('should open new tab to AIS when fellow name is clicked', () => {
    global.open = jest.fn();
    const fellowNAme = wrapper.find('.clickableCardContent');
    fellowNAme.simulate('click');
    expect(global.open).toBeCalled();
  });
});
