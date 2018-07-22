import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import { ICONS } from '../../utils/enums';

class CalendarIcon extends Component {
  render() {
    const { id, onClick } = this.props;

    return (
      <span
        name="calendar"
        id={id}
        onClick={onClick}
      >
        <Icon
          icon={ICONS.CALENDAR}
          width={20}
          height={20}
          color={'#626262'}
        />
      </span>
    );
  }
}

CalendarIcon.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func
};

export default CalendarIcon;
