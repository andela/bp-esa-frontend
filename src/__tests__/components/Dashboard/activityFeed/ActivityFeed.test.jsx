import React from 'react';
import { mount } from 'enzyme';
import ActivityFeed from '../../../../components/Dashboard/ActivityFeed/index';

describe('Activity Feed', () => {
  let wrapper;
  const props = {
    reportData: [
      {
        id: 1,
        fellowName: 'Kitika, Kelvin',
        type: 'offboarding',
        updatedAt: '2019-05-15T13:47:04.608Z',
      },
    ],
  };
  beforeEach(() => {
    wrapper = mount(<ActivityFeed {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders component with no content', () => {
    const newProps = {
      reportData: [],
    };
    const wrapperWithNewProps = mount(<ActivityFeed {...newProps} />);
    const noInfo = wrapperWithNewProps.find('.activity-feed-no-activity');
    expect(noInfo.length).toEqual(1);
    wrapperWithNewProps.unmount();
  });
  it('renders card fellow information', () => {
    const card = wrapper.find('.activity-feed-container');
    expect(card.length).toEqual(1);
  });
});
