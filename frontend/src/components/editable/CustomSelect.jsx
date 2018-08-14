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
import { ROLES } from '../../utils/enums';

class CustomSelect extends Component {

  state = {
    value: this.props.value && this.props.name === 'categories' ? this.props.value.categories : this.props.value
  };

  componentWillMount() {
    const { loadAllUsersInProject, loadAllCategoriesInProject, value, name } = this.props;

    if (name === 'categories') {
      loadAllCategoriesInProject(value.projectId);
    } else if (value && value.projectId) {
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
    const { renderCustom, usersInProject, name, categories, multi, clearable, loading } = this.props;
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
        isLoading={loading}
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
  clearable: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  usersInProject: state.project.usersInProject.filter(user => {
    const project = state.layout.selectedProject || state.layout.project;
    const developers = project.members.filter(member => member.role === ROLES.DEVELOPER);

    return !!developers.find(member => member.userId === user.id);
  }).map(user => ({
    value: user.id,
    label: user.username,
    ...user
  })),
  categories: state.layout.categories.map(category => ({
    value: category.id,
    label: category.name,
    ...category
  })),
  loading: state.project.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllUsersInProject: loadAllUsersInProject,
  loadAllCategoriesInProject: loadAllCategoriesInProject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomSelect);
