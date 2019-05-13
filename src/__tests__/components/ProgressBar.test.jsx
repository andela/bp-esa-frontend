import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

describe('The Progress Bar', () => {
  function renderProgressBar(args) {
    const defaultProps = {
      upselledDevs: 10,
    };

    const props = { ...defaultProps, ...args };
    return shallow(<ProgressBar {...props} />); //eslint-disable-line
  }

  it('renders correctly', () => {
    const wrapper = renderProgressBar();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with a width of 30% with 30 upselled Developers', () => {
    const wrapper = renderProgressBar({ upselledDevs: 30 });
    const width = wrapper.find('.progress').prop('style');
    expect(width).toHaveProperty('width', '30%');
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with a width of 60% with 60 upselled Developers', () => {
    const wrapper = renderProgressBar({ upselledDevs: 60 });
    const width = wrapper.find('.progress').prop('style');
    expect(width).toHaveProperty('width', '60%');
    expect(wrapper).toMatchSnapshot();
  });
});
