import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../components/Spinner';

const getComponent = () => shallow(<Spinner />);

describe('Spinner', () => {
  it('should render as expected', () => {
    expect(getComponent()).toMatchSnapshot();
  });
});
