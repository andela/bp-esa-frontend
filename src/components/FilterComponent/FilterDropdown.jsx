import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';

export const success = 'success';
export const failure = 'failure';
export const onboarding = 'onboarding';
export const offboarding = 'offboarding';
export const partnerName = 'partner';
export const fellowName = 'fellow';
export const emailAutomations = 'emailAutomation';
export const slackAutomations = 'slackAutomation';
export const freckleAutomations = 'freckleAutomation';

/**
 * Displays a custom checkbox
 */
export const Checkbox = ({
  checkCondition, id, label, name, noLabel = false, ...rest
}) => (noLabel ? (
  <React.Fragment>
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checkCondition}
      {...rest}
    />
    <span className="checkmark" />
  </React.Fragment>
) : (
  <label className={`${id}-label`} htmlFor={id}>
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checkCondition}
      {...rest}
    />
    <span className="checkmark" />
    {label}
  </label>
)
);

Checkbox.defaultProps = {
  noLabel: false,
  label: '',
};
Checkbox.propTypes = {
  checkCondition: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  noLabel: PropTypes.bool,
};


const FilterDropdown = (props) => {
  const {
    filters: {
      searchBy, type, emailAutomation, slackAutomation, freckleAutomation, date,
    },
    handleInputChange,
  } = props;

  const handleDateChange = (selectedDate, selection) => {
    const e = { target: { name: 'date', id: selection, value: selectedDate }, persist: () => {} };
    handleInputChange(e);
  };

  return (
    <div className="filter-dropdown-parent">
      <div className="search-by">
        <p className="search-title"><b>Search by</b></p>
        <Checkbox
          checkCondition={searchBy === fellowName}
          label="Fellow"
          id="fellowName"
          name="searchBy"
          value={fellowName}
        />
        <Checkbox
          checkCondition={searchBy === partnerName}
          label="Partner"
          id="partnerName"
          name="searchBy"
          value={partnerName}
        />
      </div>
      <div className="automation-type">
        <p className="automation-type-title"><b>Automation Type</b></p>
        <Checkbox
          checkCondition={type === onboarding}
          label={onboarding}
          id={onboarding}
          name="type"
          value={onboarding}
        />
        <Checkbox
          checkCondition={type === offboarding}
          label={offboarding}
          id={offboarding}
          name="type"
          value={offboarding}
        />
      </div>
      <div className="automation-status">
        <p className="automation-status-title"><b>Automation Status</b></p>
        <table>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Success</th>
              <th>Failure</th>
            </tr>
          </thead>
          <tbody>
            <tr className="email">
              <td>Email</td>
              <td>
                <Checkbox
                  checkCondition={emailAutomation === success}
                  name={emailAutomations}
                  id="emailSuccess"
                  noLabel
                  value={success}
                />
              </td>

              <td>
                <Checkbox
                  checkCondition={emailAutomation === failure}
                  name={emailAutomations}
                  id="emailFailure"
                  noLabel
                  value={failure}
                />
              </td>

            </tr>
            <tr className="slack">
              <td>Slack</td>
              <td>
                <Checkbox
                  checkCondition={slackAutomation === success}
                  name={slackAutomations}
                  id="slackSuccess"
                  noLabel
                  value={success}
                />
              </td>

              <td>
                <Checkbox
                  checkCondition={slackAutomation === failure}
                  name={slackAutomations}
                  id="slackFailure"
                  noLabel
                  value={failure}
                />
              </td>

            </tr>
            <tr className="freckle">
              <td>Freckle</td>
              <td>
                <Checkbox
                  checkCondition={freckleAutomation === success}
                  name={freckleAutomations}
                  id="freckleSuccess"
                  noLabel
                  value={success}
                />
              </td>

              <td>
                <Checkbox
                  checkCondition={freckleAutomation === failure}
                  name={freckleAutomations}
                  id="freckleFailure"
                  noLabel
                  value={failure}
                />
              </td>

            </tr>
          </tbody>
        </table>
      </div>
      <div className="automation-date">
        { /* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */ }
        <label htmlFor="from">
          <span>From:</span>
          <DatePicker
            selection="from"
            onChange={handleDateChange}
            dateSelected={date.from}
            id="from"
          />
        </label>
        <label htmlFor="to">
          <span>To:</span>
          <DatePicker
            selection="to"
            onChange={handleDateChange}
            dateSelected={date.to}
            id="to"
            minDate={date.from || undefined}
          />
        </label>
      </div>
      <button type="submit" className="apply-filters">Apply Filters</button>
    </div>
  );
};

FilterDropdown.propTypes = {
  filters: PropTypes.shape({
    type: PropTypes.string,
    emailAutomation: PropTypes.string,
    slackAutomation: PropTypes.string,
    freckleAutomation: PropTypes.string,
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
