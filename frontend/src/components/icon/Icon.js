import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../stylesheets/GeneralStyled';

const Icon = props => {
  return (
    <Svg
      viewBox="0 0 1024 1024"
      {...props}
    >
      {
        props.icon.map(element => (
          <path key={element} d={element}></path>
        ))
      }
    </Svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.array.isRequired
};

export default Icon;
