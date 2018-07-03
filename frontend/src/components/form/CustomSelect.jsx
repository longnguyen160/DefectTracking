import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CustomOptionForSelect from './CustomOptionForSelect';
import CustomValueForSelect from './CustomValueForSelect';

class CustomSelect extends Component {

  handleChange = (event) => {
    const { input, handleChange, field, multi } = this.props;

    input.onChange(event.value);
  };

  optionComponent = () => {
    const { input } = this.props;

    return (props) => (
      <CustomOptionForSelect
        name={input.name}
        {...props}
      />
    );
  };

  valueComponent = () => {
    const { input } = this.props;

    return (props) => (
      <CustomValueForSelect
        name={input.name}
        {...props}
      />
    );
  };

  render() {
    const { input, options, placeholder, multi, disabled, searchable, renderCustom } = this.props;
    let config = {};

    if (renderCustom) {
      config = Object.assign(config, {
        optionComponent: this.optionComponent(),
        valueComponent: this.valueComponent(),
      });
    }

    return (
      <Select
        searchable={searchable}
        classNamePrefix="react-select"
        name={input.name}
        value={input.value}
        options={options}
        multi={multi}
        placeholder={placeholder}
        disabled={disabled}
        onChange={this.handleChange}
        onBlur={() => input.onBlur(input.value)}
        {...config}
      />
    );
  }
}

CustomSelect.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  field: PropTypes.string,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  renderCustom: PropTypes.bool
};

export default CustomSelect;
