import React from 'react';
import PropTypes from 'prop-types';
import { Input, LineFormStyled, TextArea } from '../../stylesheets/GeneralStyled';

class CustomInput extends React.Component {

  state = {
    value: this.props.value
  };

  setValue = (e) => {
    const { setValueToAnchor } = this.props;

    this.setState({ value: e.target.value });
    setValueToAnchor(e.target.value, e);
  };

  handleKeyDown = (e) => {
    const { onSubmit, setEditable } = this.props;

    if (e.keyCode === 13) {
      this.setValue(e);
      onSubmit();
    } else if (e.keyCode === 27){
      setEditable(false);
    }
  };

  render() {
    const { renderType } = this.props;
    const { value } = this.state;

    let InputType = Input;

    switch (renderType) {
      case 'textarea':
        InputType = TextArea;
        break;
      default:
        break;
    }

    return (
      <LineFormStyled>
        <InputType
          value={value}
          onChange={this.setValue}
          onKeyDown={this.handleKeyDown}
        />
      </LineFormStyled>
    );
  }
}

CustomInput.propTypes = {
  setValueToAnchor: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setEditable: PropTypes.func.isRequired,
  renderType: PropTypes.string.isRequired
};

export default CustomInput;
