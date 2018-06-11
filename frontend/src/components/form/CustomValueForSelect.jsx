import React from 'react';
import PropTypes from 'prop-types';
import { Image, TableBlockStyled } from '../../stylesheets/GeneralStyled';
import { ICONS } from '../../utils/enums';
import Icon from '../icon/Icon';

class CustomValueForSelect extends React.Component {

  renderIcon = () => {
    const { name, value } = this.props;

    switch (name) {
      case 'priority':
        return (
          <Icon icon={ICONS.ARROW} color={value.color} width={20} height={20} rotated rotate={'rotateZ(90deg)'}/>
        );
      default:
        return (
          <Image topNav src={value.profile ? value.profile.imageSrc : '/images/default_avatar.jpg'}/>
        );
    }
  };

  render() {
    return (
      <div className="Select-value">
				<span className="Select-value-label">
          <TableBlockStyled alignLeft>
            {this.renderIcon()}
            {this.props.children}
          </TableBlockStyled>
				</span>
      </div>
    );
  }
}

CustomValueForSelect.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
};

export default CustomValueForSelect;
