import React from 'react';
import PropTypes from 'prop-types';
import { Image, TableBlockStyled } from '../../stylesheets/GeneralStyled';
import { FILE_BASE_URL, ICONS, DEFAULT_AVATAR } from '../../utils/enums';
import Icon from '../icon/Icon';

class CustomValueForSelect extends React.Component {

  renderIcon = () => {
    const { name, value } = this.props;

    switch (name) {
      case 'priority':
        return (
          <Icon
            icon={ICONS.ARROW}
            color={value.color}
            width={15}
            height={20}
            rotated
            rotate={'rotateZ(90deg)'}
          />
        );
      default:
        return (
          <Image
            dynamic={'20px'}
            margin={'0 5px 0 0'}
            src={value.avatarURL ? FILE_BASE_URL + value.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}
          />
        );
    }
  };

  render() {
    return (
      <div className="Select-value">
				<span className="Select-value-label">
          <TableBlockStyled alignLeft fontSize={'13px'}>
            {this.renderIcon()}
            {this.props.children}
          </TableBlockStyled>
				</span>
      </div>
    );
  }
}

CustomValueForSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
};

export default CustomValueForSelect;
