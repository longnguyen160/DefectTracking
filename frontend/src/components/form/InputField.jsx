import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { INPUT_TEXT, INPUT_PASSWORD, TEXT_AREA, SELECT, CREATABLE, DATETIME_PICKER, FILE } from '../../utils/enums';
import CustomInput from './CustomInput';
import CustomSelect from './CustomSelect';
import CustomCreatable from './CustomCreatable';
import CustomDateTime from './CustomDateTime';
import CustomDropZone from './CustomDropZone';

const typeComponents = {
  [INPUT_TEXT]: CustomInput,
  [INPUT_PASSWORD]: CustomInput,
  [TEXT_AREA]: CustomInput,
  [FILE]: CustomDropZone,
  [SELECT]: CustomSelect,
  [CREATABLE]: CustomCreatable,
  [DATETIME_PICKER]: CustomDateTime,
};

export default class InputField extends React.Component {

  render() {
    const { name, type } = this.props;
    const customComponent = typeComponents[type];

    return (
      <Field
        {...this.props}
        name={name}
        component={customComponent}
      />
    );
  }
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
