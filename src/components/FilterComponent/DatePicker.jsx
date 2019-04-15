import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DatePicker = (props) => {
  const {
    onChange, selection, dateSelected, ...rest
  } = props;
  return (
    <ReactDatePicker
      selected={dateSelected || undefined}
      onChange={date => onChange(date, selection)}
      dropdownMode="select"
      shouldCloseOnSelect={false}
      calendarClassName="custom-date-picker"
      dateFormat="MMMM DD, YYYY"
      maxDate={moment()}
      {...rest}
    />
  );
};


DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  selection: PropTypes.string.isRequired,
  dateSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default DatePicker;
