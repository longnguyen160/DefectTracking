import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from '../../stylesheets/GeneralStyled';

const Icon = props => {
  return (
    <Svg
      viewBox={props.viewBox || "0 0 1024 1024"}
      {...props}
    >
      {
        props.icon.map(element => (
          <path key={element} d={element}>
            {
              props.loading &&
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
            }
          </path>
        ))
      }
    </Svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.array.isRequired
};

export default Icon;
