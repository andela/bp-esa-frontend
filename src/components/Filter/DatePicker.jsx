import React, { PureComponent } from 'react';
import PropTypes from 'proptypes';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class DatePicker extends PureComponent {
  state = {
    selectedDate: null,
  }

  onChange = (date) => {
    const { handleChange, id } = this.props;
    this.setState({
      selectedDate: date,
    });
    handleChange(date && date.format('YYYY MM DD'), id);
  }

  render() {
    const { selectedDate } = this.state;
    const { placeholderText } = this.props;
    return (
      <ReactDatePicker
        selected={selectedDate}
        onChange={this.onChange}
        className="react-date-picker"
        placeholderText={placeholderText}
      />
    );
  }
}

DatePicker.defaultProps = {
  placeholderText: '',
};

DatePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholderText: PropTypes.string,
};

export default DatePicker;
