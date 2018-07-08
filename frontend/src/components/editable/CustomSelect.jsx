import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CustomOptionForSelect from '../form/CustomOptionForSelect';
import CustomValueForSelect from '../form/CustomValueForSelect';
import { loadAllUsersInProject } from '../../modules/projects/actions/usersInProject';
import { loadAllCategoriesInProject } from '../../modules/layout/actions/layout';

class CustomSelect extends Component {

  state = {
    value: this.props.value && this.props.name === 'categories' ? this.props.value.categories : this.props.value
  };

  componentWillMount() {
    const { loadAllUsersInProject, loadAllCategoriesInProject, value, name } = this.props;

    if (name === 'categories') {
      loadAllCategoriesInProject(value.projectId);
    } else if (value.projectId) {
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
    const { renderCustom, usersInProject, name, categories, multi, clearable } = this.props;
    let { options } = this.props;
    const { value } = this.state;
    let config = {};

    if (!options) {
      if (name === 'categories') {
        options = categories;
      } else {
        options = usersInProject
      }
    }
    if (renderCustom) {
      config = Object.assign(config, {
        optionComponent: this.optionComponent(),
        valueComponent: this.valueComponent(),
      });
    }

    return (
      <Select
        searchable={true}
        clearable={clearable}
        multi={multi}
        classNamePrefix="react-select"
        value={value}
        options={options}
        onChange={this.handleChange}
        {...config}
      />
    );
  }
}

CustomSelect.propTypes = {
  usersInProject: PropTypes.array.isRequired,
  setValueToAnchor: PropTypes.func.isRequired,
  renderCustom: PropTypes.bool,
  multi: PropTypes.bool,
  loadAllUsersInProject: PropTypes.func.isRequired,
  loadAllCategoriesInProject: PropTypes.func.isRequired,
  projectId: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  categories: PropTypes.array.isRequired,
  value: PropTypes.object.isRequired,
  clearable: PropTypes.bool
};

const mapStateToProps = state => ({
  usersInProject: state.project.usersInProject.map(user => ({
    value: user.id,
    label: user.username,
    ...user
  })),
  categories: state.layout.categories.map(category => ({
    value: category.id,
    label: category.name,
    ...category
  })),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllUsersInProject: loadAllUsersInProject,
  loadAllCategoriesInProject: loadAllCategoriesInProject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomSelect);
