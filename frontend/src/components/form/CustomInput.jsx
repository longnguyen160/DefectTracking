import React from 'react';
import PropTypes from 'prop-types';
import { Input, TextArea } from '../../stylesheets/GeneralStyled';
import { DragDrop } from 'uppy/lib/react/index';

const CustomInput = (field) => {
  const { input, type, placeholder, renderType, uppy, meta: { touched, error } } = field;
  let InputType = Input;

  switch (renderType) {
    case 'textarea':
      InputType = TextArea;
      break;
    case 'file':
      InputType = DragDrop;
      break;
    default:
      break;
  }

  return (
    <InputType
      type={type}
      placeholder={placeholder}
      {...input}
      uppy={uppy}
      inputName={input.name}
    />
  );
};

CustomInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  renderType: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  uppy: PropTypes.object
};

export default CustomInput;
