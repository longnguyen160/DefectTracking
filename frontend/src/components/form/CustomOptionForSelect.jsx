import React from 'react';
import PropTypes from 'prop-types';
import { CheckBoxWrapper, Image, InputCheckboxStyled, TableBlockStyled } from '../../stylesheets/GeneralStyled';
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
          <Icon
            icon={ICONS.ARROW}
            color={option.color}
            width={15}
            height={20}
            rotated
            rotate={'rotateZ(90deg)'}
          />
        );

      case 'user':
      case 'assignee':
        return (
          <Image
            dynamic={'20px'}
            margin={'0 5px 0 0'}
            src={option.avatarURL ? FILE_BASE_URL + option.avatarURL : '/images/default_avatar.jpg'}
          />
        );

      default:
        return null;
    }
  };

  render() {
    const { className, option, isSelected, multi } = this.props;

    if (multi) {
      return (
        <TableBlockStyled
          className={className}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
          fontSize={'13px'}
          alignLeft
        >
          <CheckBoxWrapper>
            <InputCheckboxStyled
              id={option.value}
              type="checkbox"
              checked={isSelected}
            />
            <label htmlFor={option.value}>
              {this.renderIcon()}
              {this.props.children}
            </label>
          </CheckBoxWrapper>
        </TableBlockStyled>
      );
    }

    return (
      <TableBlockStyled
        className={className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        fontSize={'13px'}
        alignLeft
      >
        {this.renderIcon()}
        {this.props.children}
      </TableBlockStyled>
    );
  }
}

CustomOptionForSelect.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
  onFocus: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  multi: PropTypes.bool
};

export default CustomOptionForSelect;
