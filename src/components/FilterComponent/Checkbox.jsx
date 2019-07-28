/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a custom checkbox
 */
const Checkbox = ({
  checkCondition, id, label, name, noLabel = false, ...rest
}) => {
  const Input = () => (
    <React.Fragment>
      <input
        type="checkbox"
        id={id}
        name={name}
        defaultChecked={checkCondition}
        {...rest}
      />
      <span className="checkmark" />
    </React.Fragment>
  );
  return (noLabel ? <Input /> : (
    <label className={`${id}-label`} htmlFor={id}>
      <Input />
      {label}
    </label>
  )
  );
};

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

export const generateCheckboxDuo = (name, filter, values, labels = []) => {
  const baseCheckbox = {
    name,
    noLabel: !labels.length,
  };
  return [{
    ...baseCheckbox,
    checkCondition: filter === values[0],
    value: values[0],
    label: labels[0] || '',
    id: `${name}-${values[0]}`,
  }, {
    ...baseCheckbox,
    checkCondition: filter === values[1],
    value: values[1],
    label: labels[1],
    id: `${name}-${values[1]}`,
  }];
};

export default Checkbox;
