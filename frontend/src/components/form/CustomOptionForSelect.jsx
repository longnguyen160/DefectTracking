import React from 'react';
import PropTypes from 'prop-types';
import { Image, TableBlockStyled } from '../../stylesheets/GeneralStyled';
import { FILE_BASE_URL, ICONS } from '../../utils/enums';
import Icon from '../icon/Icon';

class CustomOptionForSelect extends React.Component {

  handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  };

  handleMouseEnter = (event) => {
    this.props.onFocus(this.props.option, event);
  };

  handleMouseMove = (event) => {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  };

  renderIcon = () => {
    const { name, option } = this.props;

    switch (name) {
      case 'priority':
        return (
          <Icon icon={ICONS.ARROW} color={option.color} width={20} height={20} rotated rotate={'rotateZ(90deg)'}/>
        );
      default:
        return (
          <Image topNav src={option.avatarURL ? FILE_BASE_URL + option.avatarURL : '/images/default_avatar.jpg'}/>
        );
    }
  };

  render() {
    const { className } = this.props;

    return (
      <TableBlockStyled
        className={className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        alignLeft
      >
        {this.renderIcon()}
        {this.props.children}
      </TableBlockStyled>
    )
  }
}

CustomOptionForSelect.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default CustomOptionForSelect;
