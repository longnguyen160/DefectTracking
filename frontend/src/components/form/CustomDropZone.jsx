import React from 'react';
import PropTypes from 'prop-types';
import { DropZoneStyled } from '../../stylesheets/GeneralStyled';

const CustomDropZone = (field) => {
  const { input, type, onDrop } = field;

  return (
    <DropZoneStyled
      name={input.name}
      type={type}
      onDrop={onDrop}
      {...input}
    >
      Dropping some files here, or click to select files to upload.
    </DropZoneStyled>
  );
};

CustomDropZone.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default CustomDropZone;
