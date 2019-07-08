import React from 'react';
import { mount } from 'enzyme';
import AutomationDetails from '../../components/AutomationDetails';

const props = {
  history: {},
  currentUser: {
    additionalUserInfo: { profile: { name: 'Kelvin', picture: 'ddff' } },
  },
  formatDates: jest.fn(),
  isModalOpen: false,
  closeModal: jest.fn(),
  modalContent: {
    id: 1,
    fellowName: 'Tunmise, Tunmise',
    partnerName: 'Andela',
    type: 'Onboarding',
    slackAutomations: {
      status: 'success',
      slackActivities: [
        {
          channelName: 'andela-int',
          type: 'Addition',
          status: 'success',
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
      freckleActivities: [
        {
          status: 'failure',
          statusMessage: 'Request failed with status code 403',
          freckleUserId: null,
          projectId: null,
          type: 'projectCreation',
        },
      ],
    },
    emailAutomations: {
      status: 'success',
      emailActivities: [{
        id: 1,
        emailTo: 'Tunmise.ogunniyi@andela.com',
        subject: 'Onboarding',
        status: 'success',
      },
      {
        id: 2,
        emailTo: 'Tunmise.ogunniyi@andela.com',
        subject: 'Onboarding',
        status: 'success',
      },
      ],
    },
    date: '2017-09-29 01:22',
  },
  isLoading: false,
  retryingAutomation: false,
  handleRetryAutomation: jest.fn(),
};

const getComponent = () => mount(<AutomationDetails {...props} />);

describe('Automation details', () => {
  it('should render slack details', () => {
    const component = getComponent();
    expect(component.instance().state.modalType).toEqual('slack');
  });

  it('should render email details', () => {
    const component = getComponent();
    component.find('#email').simulate('click');
    expect(component.instance().state.modalType).toEqual('email');
  });

  it('should redirect user to AIS profile', () => {
    const wrapper = getComponent().setProps({
      ...props,
    });
    const component = wrapper.find('.fas');
    component.simulate('click');
    expect(component.props().title).toEqual('Open Tunmise, Tunmise AIS profile');
  });

  it('should render freckle details', () => {
    const component = getComponent();
    component.find('#freckle').simulate('click');
    expect(component.instance().state.modalType).toEqual('freckle');
  });

  it('should render freckle details with no activities', () => {
    const prop = {
      history: {},
      currentUser: {
        additionalUserInfo: { profile: { name: 'Kelvin', picture: 'ddff' } },
      },
      formatDates: jest.fn(),
      isModalOpen: false,
      closeModal: jest.fn(),
      modalContent: {
        id: 1,
        fellowName: 'Tunmise, Tunmise',
        partnerName: 'Andela',
        type: 'Onboarding',
        slackAutomations: {
          status: 'success',
          slackActivities: [
            {
              channelName: 'andela-int',
              type: 'Addition',
              status: 'success',
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
          status: 'success',
          emailActivities: [{
            id: 1,
            emailTo: 'Tunmise.ogunniyi@andela.com',
            subject: 'Onboarding',
            status: 'success',
          },
          {
            id: 2,
            emailTo: 'Tunmise.ogunniyi@andela.com',
            subject: 'Onboarding',
            status: 'success',
          },
          ],
        },
        date: '2017-09-29 01:22',
      },
    };
    const component = mount(<AutomationDetails {...prop} />);
    component.find('#freckle').simulate('click');
    expect(component.instance().state.modalType).toEqual('freckle');
  });
  it('should render email details with no activities', () => {
    const prop = {
      history: {},
      currentUser: {
        additionalUserInfo: { profile: { name: 'Kelvin', picture: 'ddff' } },
      },
      formatDates: jest.fn(),
      isModalOpen: false,
      closeModal: jest.fn(),
      modalContent: {
        id: 1,
        fellowName: 'Tunmise, Tunmise',
        partnerName: 'Andela',
        type: 'Onboarding',
        slackAutomations: {
          status: 'success',
          slackActivities: [
            {
              channelName: 'andela-int',
              type: 'Addition',
              status: 'success',
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
          status: 'success',
        },
        date: '2017-09-29 01:22',
      },
    };
    const component = mount(<AutomationDetails {...prop} />);
    component.find('#email').simulate('click');
    expect(component.instance().state.modalType).toEqual('email');
  });
});
