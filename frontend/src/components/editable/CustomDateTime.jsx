import React from 'react';
import PropTypes from 'prop-types';
import { Input, LineFormStyled, TextArea } from '../../stylesheets/GeneralStyled';
import moment from 'moment';
import DatePicker from 'react-datepicker/es';
import CalendarIcon from '../icon/CalendarIcon';

class CustomDateTime extends React.Component {

  state = {
    value: this.props.value
  };

  setValue = (e) => {
    const { setValueToAnchor } = this.props;

    this.setState({ value: e.target.value });
    setValueToAnchor(e.target.value, e);
  };

  handleKeyDown = (e) => {
    const { onSubmit, setEditable } = this.props;

    if (e.keyCode === 13) {
      this.setValue(e);
      onSubmit();
    } else if (e.keyCode === 27){
      setEditable(false);
    } else if (e.keyCode === 8 || e.keyCode === 46) {
      this.setState({ value: null });
    }
  };

  handleFocus = () => {
    document.getElementById("datePicker").click();
  };

  handleEventDateChange = (value) => {
    if (value) {
      this.setState({ value });
    }
  };

  render() {
    const { value } = this.state;

    return (
      <LineFormStyled
        noMargin
        customDatePicker
        autoWidth
        maxContent
      >
        <Input
          value={value ? moment(value).format('LLL') : ''}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          noMargin
          width={'180px'}
        />
        <DatePicker
          id="datePicker"
          customInput={<CalendarIcon />}
          selected={moment(value)}
          minDate={moment()}
          showTimeSelect
          timeIntervals={15}
          timeCaption="time"
          onChange={this.handleEventDateChange}
          popperPlacement={'bottom-start'}
        />
      </LineFormStyled>
    );
  }
}

CustomDateTime.propTypes = {
  setValueToAnchor: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setEditable: PropTypes.func.isRequired
};

export default CustomDateTime;
