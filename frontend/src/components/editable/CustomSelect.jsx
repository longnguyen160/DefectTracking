import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CustomOptionForSelect from '../form/CustomOptionForSelect';
import CustomValueForSelect from '../form/CustomValueForSelect';
import { loadAllUsersInProject } from '../../modules/projects/actions/usersInProject';

class CustomSelect extends Component {

  state = {
    value: this.props.value
  };

  componentWillMount() {
    const { loadAllUsersInProject, value } = this.props;

    if (value.projectId) {
      loadAllUsersInProject(value.projectId);
    }
  }

  handleChange = (value) => {
    const { setValueToAnchor } = this.props;

    this.setState({ value });
    setValueToAnchor(value);
  };

  optionComponent = () => {
    const { name } = this.props;

    return (props) => (
      <CustomOptionForSelect
        name={name}
        {...props}
      />
    );
  };

  valueComponent = () => {
    const { name } = this.props;

    return (props) => (
      <CustomValueForSelect
        name={name}
        {...props}
      />
    );
  };

  render() {
    const { renderCustom, usersInProject, name, options } = this.props;
    const { value } = this.state;
    let config = {};

    if (renderCustom) {
      config = Object.assign(config, {
        optionComponent: this.optionComponent(),
        valueComponent: this.valueComponent(),
      });
    }

    return (
      <Select
        searchable={true}
        classNamePrefix="react-select"
        value={value}
        options={options ? options : usersInProject}
        onChange={this.handleChange}
        valueKey={name === 'priority' ? 'value' : 'id'}
        labelKey={name === 'priority' ? 'label' : 'username'}
        {...config}
      />
    );
  }
}

CustomSelect.propTypes = {
  usersInProject: PropTypes.array.isRequired,
  setValueToAnchor: PropTypes.func.isRequired,
  renderCustom: PropTypes.bool,
  loadAllUsersInProject: PropTypes.func.isRequired,
  projectId: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  value: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  usersInProject: state.project.usersInProject
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllUsersInProject: loadAllUsersInProject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomSelect);
