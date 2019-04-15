/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from './Checkbox';
import DatePicker from './DatePicker';

const Section = ({ section, children, withTitle = false }) => (
  <div className={section}>
    {withTitle && <p className={`${section}-title`}><b>{section.split('-').join(' ')}</b></p>}
    {children}
  </div>
);

Section.defaultProps = {
  children: null,
  withTitle: false,
};
Section.propTypes = {
  children: PropTypes.any,
  withTitle: PropTypes.bool,
  section: PropTypes.string.isRequired,
};

const FilterSection = ({ section, inputs }) => (
  <Section withTitle section={section}>
    { inputs.map(input => (<Checkbox {...input} key={input.id} />))}
  </Section>
);

FilterSection.defaultProps = {};
FilterSection.propTypes = {
  section: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape(Checkbox.propTypes)).isRequired,
};

export const AutomationStatus = ({ statusInputs }) => (
  <Section withTitle section="automation-status">
    <table>
      <thead>
        <tr>
          <th>Channel</th>
          <th>Success</th>
          <th>Failure</th>
        </tr>
      </thead>
      <tbody>
        { statusInputs.map(input => (
          <tr className={input.section} key={input.section}>
            <td>{input.section}</td>
            {
              input.checkboxes.map(checkbox => (
                <td key={checkbox.id}>
                  <Checkbox
                    {...checkbox}
                  />
                </td>
              ))
            }
          </tr>
        ))}
      </tbody>
    </table>
  </Section>
);
AutomationStatus.propTypes = {
  statusInputs: PropTypes.arrayOf(PropTypes.shape({
    section: PropTypes.string,
    checkboxes: PropTypes.arrayOf(PropTypes.shape(Checkbox.propTypes)),
  })).isRequired,
};

export const AutomationDate = ({ dateInputs }) => (
  <Section section="automation-date">
    { dateInputs.map(input => (
      <label htmlFor={input.selection} key={input.selection}>
        <span>
          {input.selection}
        </span>
        <DatePicker {...input} id={input.selection} />
      </label>
    ))}
  </Section>
);

AutomationDate.propTypes = {
  dateInputs: PropTypes.arrayOf(PropTypes.shape(DatePicker.propTypes)).isRequired,
};

export default FilterSection;
