import React from 'react';
import { shallow } from 'enzyme';
import StatsCard from '../../../components/StatsCard';

const props = {
  stat: {
    success: 1,
    total: 191,
  },
  type: 'Freckle',
};

const getComponent = () => shallow(<StatsCard {...props} />);

describe('StatsCard', () => {
  it('should render as expected', () => {
    expect(getComponent()).toMatchSnapshot();
  });
});
