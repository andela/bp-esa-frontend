import React from 'react';
import { mount } from 'enzyme';
import AutomationDetails from '../../components/AutomationDetails';
import ReportPage from '../../components/ReportPage';

const props = {
  history: {},
  currentUser: {
    additionalUserInfo: { profile: { name: 'Kelvin', picture: 'ddff' } },
  },
  isModalOpen: false,
  closeModal: jest.fn(),
  modalType: 'slack',
  modalContent: {
    id: 1,
    fellowName: 'Tunmise',
    partnerName: 'Andela',
    type: 'Onboarding',
    slackAutomation: {
      success: true,
      slackChannels: [
        {
          slackChannel: 'andela-int',
          type: 'Addition',
          success: true,
        },
        {
          slackChannel: 'andela',
          type: 'Removal',
          success: true,
        },
      ],
    },
    freckleAutomation: {
      success: false,
    },
    emailAutomation: {
      success: true,
      email: [{
        id: 1,
        emailTo: 'Tunmise.ogunniyi@andela.com',
        subject: 'Onboarding',
        success: true,
      },
      {
        id: 2,
        emailTo: 'Tunmise.ogunniyi@andela.com',
        subject: 'Onboarding',
        success: true,
      },
      ],
    },
    date: '2017-09-29 01:22',
  },
};

const getComponent = () => shallow(<AutomationDetails {...props} />);

describe('Automation details', () => {
  it('should render slack details', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it('should render email details', () => {
    const component = getComponent();
    component.setProps({
      modalType: 'email',
    });
    expect(getComponent()).toMatchSnapshot();
    expect(component.find('.table-body-details')).toBeTruthy();
  });

  it('should render freckle details', () => {
    const component = getComponent();
    component.setProps({
      modalType: 'freckle',
    });
    expect(getComponent()).toMatchSnapshot();
  });
});

describe('Automation details methods', () => {
  it('should call the method closeModal', () => {
    const component = mount(<ReportPage {...props} />);
    const componentInstance = component.instance();
    const spy = jest.spyOn(componentInstance, 'closeModal');
    component.find('.fa.fa-info-circle.success').at(0).simulate('click');
    component.find('.fas.fa-times').at(0).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
