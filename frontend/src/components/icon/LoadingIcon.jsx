import React from 'react';
import Icon from './Icon';
import { ICONS } from '../../utils/enums';

const LoadingIcon = () => (
  <Icon
    icon={ICONS.LOADING}
    color={'#026a95'}
    width={30}
    height={30}
    loading={true}
    viewBox={'0 0 50 50'}
  />
);

export default LoadingIcon;
