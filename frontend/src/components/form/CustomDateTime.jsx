import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class CustomDateTimeField extends PureComponent {
  render() {
    const { input: { onChange, value }, label, input, isClearable } = this.props;

    return (
      <DatePicker
        isClearable={isClearable || true}
        {...input}
        selected={value ? moment(value) : null}
        onChange={onChange}
        placeholderText={label}
        showTimeSelect
        timeIntervals={15}
        dateFormat="LLL"
        timeCaption="time"
      />
    );
  }
}

CustomDateTimeField.propTypes = {
  isClearable: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
};

export default CustomDateTimeField;
