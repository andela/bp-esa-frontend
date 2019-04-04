import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../../components/Pagination/index';

describe('Pagination Component', () => {
  const props = {
    pagination: {
      numberOfPages: 1120,
      currentPage: 1,
    },
    limit: 10,
    pageNumber: 1,
    handlePagination: jest.fn(),
    onPageChange: jest.fn(),
    onChangeRowCount: jest.fn(),
  };

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Pagination {...props} />);
  });

  it('renders the pagination component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the handle pagination prop', () => {
    const button = wrapper.find('.page-btn').at(0);
    button.simulate('click');

    expect(props.handlePagination).toHaveBeenCalled();
  });

  it('calls onPageChange when a user enters a page number', () => {
    const inputBox = wrapper.find('.form-input');
    inputBox.simulate('change', { target: { value: 10 } });
    expect(props.onPageChange).toHaveBeenCalled();
  });

  it('renders the list dropdown', () => {
    const selectBox = wrapper.find('.select');
    selectBox.simulate('change', { target: { value: 25 } });
    expect(props.onChangeRowCount).toHaveBeenCalled();
  });
});
