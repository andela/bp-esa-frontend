import React from 'react';
import FilterDropdown from '../../../components/FilterComponent/FilterDropdown';
import DatePicker from '../../../components/FilterComponent/DatePicker';
import FilterComponent, { filterInitialState } from '../../../components/FilterComponent';
import Checkbox from '../../../components/FilterComponent/Checkbox';

describe('The FilterDropdown component', () => {
  it('should not regress', () => {
    const filterDropdown = shallow(
      <FilterDropdown
        filters={filterInitialState}
        handleInputChange={() => {}}
      />,
    );
    expect(filterDropdown).toMatchSnapshot();
  });
});


describe('The Checkbox component', () => {
  it('should not regress(with label)', () => {
    const checkbox = shallow(
      <Checkbox
        checkCondition={false}
        id="test-checkbox"
        name="test"
        label="test checkbox"
      />,
    );
    expect(checkbox).toMatchSnapshot();
  });

  it('should not regress(without label)', () => {
    const checkbox = shallow(
      <Checkbox checkCondition={false} id="test-checkbox2" name="test2" noLabel />,
    );
    expect(checkbox).toMatchSnapshot();
  });
});


describe('The DatePicker component', () => {
  it('should not regress', () => {
    const datePicker = shallow(
      <DatePicker onChange={() => {}} selection="to" dateSelected="" />,
    );
    expect(datePicker).toMatchSnapshot();
  });
});

describe('The FilterComponent component', () => {
  it('should not regress', () => {
    const filterComponent = shallow(
      <FilterComponent filter={filterInitialState} />,
    );
    expect(filterComponent).toMatchSnapshot();
  });
});
