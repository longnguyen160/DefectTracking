import React from 'react';
import PropTypes from 'prop-types';
import { Input, TextArea } from '../../stylesheets/GeneralStyled';

const CustomInput = (field) => {
  const { input, type, placeholder, renderType, maxLength, disabled, meta: { touched, error } } = field;
  let InputType = Input;

  switch (renderType) {
    case 'textarea':
      InputType = TextArea;
      break;
    default:
      break;
  }

  return (
    <InputType
      type={type}
      placeholder={placeholder}
      {...input}
      maxLength={maxLength}
      inputName={input.name}
      disabled={disabled}
    />
  );
};

CustomInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  renderType: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.string,
  disabled: PropTypes.bool
};

export default CustomInput;
