/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { generateCheckboxDuo } from './Checkbox';
import FilterSection, { AutomationDate, AutomationStatus } from './FilterSection';

export const success = 'success';
export const failure = 'failure';
export const onboarding = 'onboarding';
export const offboarding = 'offboarding';
export const partnerName = 'partner';
export const fellowName = 'fellow';
export const emailAutomations = 'emailAutomation';
export const slackAutomations = 'slackAutomation';
export const nokoAutomations = 'nokoAutomation';
const searchByDuo = [fellowName, partnerName];
const automationTypeDuo = [onboarding, offboarding];
const successFailureDuo = [success, failure];

const onChangeDate = handleInputChange => (selectedDate, selection) => {
  const e = { target: { name: 'date', id: selection, value: selectedDate }, persist: () => {} };
  handleInputChange(e);
};

const FilterDropdown = (props) => {
  const {
    filters: {
      'search-by': searchBy, 'automation-type': type, emailAutomation, slackAutomation, nokoAutomation, date,
    },
    handleInputChange,
  } = props;

  const handleDateChange = onChangeDate(handleInputChange);

  return (
    <div className="filter-dropdown-parent">
      <FilterSection
        section="search-by"
        inputs={generateCheckboxDuo('search-by', searchBy, searchByDuo, searchByDuo)}
      />
      <FilterSection
        section="automation-type"
        inputs={generateCheckboxDuo('automation-type', type, automationTypeDuo, automationTypeDuo)}
      />
      <AutomationStatus
        statusInputs={[
          {
            section: 'email',
            checkboxes: generateCheckboxDuo(emailAutomations, emailAutomation, successFailureDuo),
          },
          {
            section: 'slack',
            checkboxes: generateCheckboxDuo(slackAutomations, slackAutomation, successFailureDuo),
          },
          {
            section: 'noko',
            checkboxes: generateCheckboxDuo(
              nokoAutomations, nokoAutomation, successFailureDuo,
            ),
          },
        ]}
      />
      <AutomationDate
        dateInputs={[{
          selection: 'from',
          onChange: handleDateChange,
          dateSelected: date.from,
        }, {
          selection: 'to',
          onChange: handleDateChange,
          dateSelected: date.to,
          minDate: date.from || undefined,
        }]}
      />
      <button type="submit" className="apply-filters">Apply Filters</button>
    </div>
  );
};

FilterDropdown.propTypes = {
  filters: PropTypes.shape({
    type: PropTypes.string,
    emailAutomation: PropTypes.string,
    slackAutomation: PropTypes.string,
    nokoAutomation: PropTypes.string,
    searchTerm: PropTypes.string,
    searchBy: PropTypes.string,
    date: {
      from: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
      to: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    },
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default FilterDropdown;
