import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import { ICONS } from '../../utils/enums';

const LoadingIcon = (props) => (
  <Icon
    icon={ICONS.LOADING}
    color={props.color || '#026a95'}
    width={props.width || 30}
    height={props.height || 30}
    loading={true}
    viewBox={'0 0 50 50'}
  />
);

LoadingIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default LoadingIcon;
