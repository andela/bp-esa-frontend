import React from 'react';
import Header from '../../components/Header';

it('should render as expected', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
