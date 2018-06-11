import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Creatable } from 'react-select';

class CustomCreatable extends Component {

  handleChange = (event) => {
    const { input } = this.props;

    if (event) {
      const arr = [];

      event.map(element => arr.push(element.value));
      input.onChange(arr);
    }
  };

  render() {
    const { input, options, placeholder, disabled } = this.props;

    return (
      <Creatable
        disabled={disabled}
        {...input}
        placeholder={placeholder}
        multi={true}
        onBlur={() => input.onBlur(input.value)}
        delimiter={','}
        value={input.value}
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}

CustomCreatable.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default CustomCreatable;
