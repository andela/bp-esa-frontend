import React from 'react';
import { mount } from 'enzyme';
import AutomationDetails from '../../components/AutomationDetails';

const jsdomOpen = window.open;

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
    nokoAutomations: {
      status: 'failure',
      nokoActivities: [
        {
          status: 'failure',
          statusMessage: 'Request failed with status code 403',
          nokoUserId: null,
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
  beforeEach( () => {
    window.open = () => {};
  });
  afterEach( () => {
    window.open = jsdomOpen;
  });

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

  it('should render noko details', () => {
    const component = getComponent();
    component.find('#noko').simulate('click');
    expect(component.instance().state.modalType).toEqual('noko');
  });

  it('should render noko details with no activities', () => {
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
        nokoAutomations: {
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
    component.find('#noko').simulate('click');
    expect(component.instance().state.modalType).toEqual('noko');
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
        nokoAutomations: {
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

  it('should render email details with activities including the recipient', () => {
    const prop = {
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
        },
        nokoAutomations: {
          status: 'failure',
        },
        emailAutomations: {
          status: 'success',
          emailActivities: [{
            id: 1,
            recipient: 'Tunmise.ogunniyi@andela.com',
            subject: 'Onboarding',
            status: 'success',
          },
          ],
        },
        date: '2017-09-29 01:22',
      },
    };
    const component = mount(<AutomationDetails {...prop} />);
    component.setState({
      updatedModalContext: component.props().modalContent,
    });
    component.find('#email').simulate('click');
    const recipient = component.find('.automation-content .content-row').at(0);
    expect(recipient.text()).toEqual('Tunmise.ogunniyi@andela.com');
  });

  it('should open new tab to partner profile when partner name is clicked', () => {
    const prop = {
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
        },
        nokoAutomations: {
          status: 'failure',
        },
        emailAutomations: {
          status: 'success',
          emailActivities: [{
            id: 1,
            recipient: 'Tunmise.ogunniyi@andela.com',
            subject: 'Onboarding',
            status: 'success',
          },
          ],
        },
        date: '2017-09-29 01:22',
      },
    };
    const component = mount(<AutomationDetails {...prop} />);
    global.open = jest.fn();
    const partnerName = component.find('.partner-name');
    partnerName.simulate('click');
    expect(global.open).toBeCalled();
  });
});
