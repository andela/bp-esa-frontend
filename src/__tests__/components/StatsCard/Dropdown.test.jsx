import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '../../../components/StatsCard/Dropdown';


const fetchStat = jest.fn();
let wrapper;

describe('Dropdown', () => {
  beforeEach(() => {
    wrapper = mount(<Dropdown fetchStat={fetchStat} />);
  });
  it('should render as expected', () => {
    expect(wrapper.instance()).toMatchSnapshot();
  });

  it('should show the dropdown when showSection is called with the dropdown hidden', () => {
    wrapper.setState({
      collapse: true,
    });
    wrapper.instance().showSection();
    expect(wrapper.state().collapse).toEqual(false);
  });

  it('should hide the dropdown when showSection is called with the dropdown showing', () => {
    wrapper.setState({
      collapse: false,
    });
    wrapper.instance().showSection();
    expect(wrapper.state().collapse).toEqual(true);
  });

  it('should set state and call the fetchStat prop with form input id passed as a parameter', () => {
    wrapper.setState({
      collapse: false,
      categoryTitle: 'this week',
    });
    const event = {
      target: {
        id: 'days',
        innerHTML: 'today',
      },
    };
    wrapper.instance().selectPeriod(event);
    expect(wrapper.state().collapse).toEqual(true);
    expect(wrapper.state().categoryTitle).toEqual('today');
    expect(fetchStat).toBeCalledWith(event.target.id);
  });

  it('should hide the dropdown when a user clicks outside the dropdown', () => {
    wrapper.setState({
      collapse: false,
    });
    const event = {
      target: {
        notStatsDropDown: true,
      },
    };
    wrapper.instance().closeStatDropdown(event);
    expect(wrapper.state().collapse).toEqual(true);
  });
});
