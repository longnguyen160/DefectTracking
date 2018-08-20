import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import Modal from './Modal';
import {
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalContentStyled,
  ModalLineStyled,
  ModalLineContentStyled,
  ModalLineTitleStyled
} from '../../stylesheets/Modal';
import { Input, LineFormStyled, TextErrorStyled } from '../../stylesheets/GeneralStyled';
import { INPUT_TEXT, ROLES, TEXT_AREA } from '../../utils/enums';
import { Button } from '../../stylesheets/Button';
import { validateForm } from '../../utils/ultis';
import { createProject, resetProjectType, updateProject } from '../../modules/projects/actions/project';
import InputField from '../form/InputField';
import { loadAllCategoryNames, resetCategories } from '../../modules/management/actions/category';
import { resetProject } from '../../modules/layout/actions/layout';
import CustomOptionForSelect from '../form/CustomOptionForSelect';
import CustomValueForSelect from '../form/CustomValueForSelect';
import { loadAllUsers, resetUsers } from '../../modules/account/actions/account';


const renderField = (field) => {
  const { input, type, placeholder } = field;

  return (
    <Input type={type} placeholder={placeholder} {...input} />
  );
};

const normalizeKey = value => value.replace(/\s/g, '').replace(/\d/g, '').toUpperCase();

class ModalCreatingProject extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      managers: []
    };
  }

  componentWillMount() {
    const { loadAllCategoryNames } = this.props;

    loadAllCategoryNames();
  }

  componentDidMount() {
    const { change, projectType } = this.props;

    if (projectType) {
      change('status', projectType);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loadedProject } = nextProps;
    const { change } = this.props;

    if (JSON.stringify(loadedProject) !== JSON.stringify(this.props.loadedProject)) {
      change('name', loadedProject.name);
      change('description', loadedProject.description);
      change('status', loadedProject.status);
      this.setState({ categories: loadedProject.categories.map(category => category.id) });
    }
  }

  componentWillUnmount() {
    const { resetProject, resetProjectType, resetCategories, resetUsers } = this.props;

    resetProjectType();
    resetCategories();
    resetProject();
    resetUsers();
  }

  handleChangeSelect = (type, values) => {
    this.setState({ [type]: values.map(value => value.id) });
  };

  handleCreateProject = (values) => {
    const { name, key, description, status } = values;
    const { categories } = this.state;
    const { createProject, onClose, updateProject, loadedProject } = this.props;
    const handleFunction = loadedProject ? updateProject : createProject;
    const project = {
      ...loadedProject,
      ...values
    };

    if (validateForm.required(name)) {
      throw new SubmissionError({ _error: 'Name is required' });
    }
    if (validateForm.required(description)) {
      throw new SubmissionError({ _error: 'Description is required' });
    }
    if (validateForm.required(status)) {
      throw new SubmissionError({ _error: 'Status is required' });
    }
    if (validateForm.required(key)) {
      throw new SubmissionError({ _error: 'Key is required' });
    }

    let managers = this.state.managers.map(manager => ({
      userId: manager,
      role: ROLES.MANAGER
    }));

    if (loadedProject) {
      project.members = loadedProject.members.filter(member => member.role !== ROLES.MANAGER).concat(managers);
    } else {
      project.members = managers;
    }

    handleFunction({
      project,
      categories
    }, () => {
      onClose();
    });
  };

  optionComponent = () => {
    return (props) => (
      <CustomOptionForSelect
        name={'user'}
        {...props}
      />
    );
  };

  valueComponent = () => {
    return (props) => (
      <CustomValueForSelect
        name={'user'}
        {...props}
      />
    );
  };

  loadUsers = (input) => {
    const { loadAllUsers } = this.props;

    if (input.length > 0) {
      loadAllUsers(input);
    }
  };

  render() {
    const {
      onClose,
      isOpen,
      handleSubmit,
      submitFailed,
      error,
      submitSucceeded,
      project,
      submitting,
      categories,
      loadedProject,
      isLoading,
      loadingUsers,
      users
    } = this.props;
    const { managers } = this.state;
    const categoryValues = this.state.categories;

    return (
      <Modal onClose={onClose} isOpen={isOpen} isVisible={true} maxWidth={'400px'}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>{loadedProject ? 'Update' : 'Create'} Project</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <form onSubmit={handleSubmit(this.handleCreateProject)} id="CreateProjectForm">
          <ModalContentStyled>
            <ModalLineStyled hasRows padding={'0 0 5px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Project Name (*)</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={INPUT_TEXT}
                      name={'name'}
                      placeholder={'Project name...'}
                      renderType={'input'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Project Key (*)</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={INPUT_TEXT}
                      name={'key'}
                      placeholder={'Project key...'}
                      renderType={'input'}
                      maxLength="10"
                      normalize={normalizeKey}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Description</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={TEXT_AREA}
                      name={'description'}
                      placeholder={'Description...'}
                      renderType={'textarea'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Managers</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled reactSelect fullWidthSelect>
                    <Select
                      placeholder={'Managers'}
                      options={users}
                      value={managers}
                      onInputChange={this.loadUsers}
                      onChange={(value) => this.handleChangeSelect('managers', value)}
                      optionComponent={this.optionComponent()}
                      valueComponent={this.valueComponent()}
                      multi
                      isLoading={loadingUsers}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Categories</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled reactSelect fullWidthSelect>
                    <Select
                      placeholder={'Categories'}
                      options={categories}
                      valueKey={"id"}
                      labelKey={"name"}
                      value={categoryValues}
                      multi
                      isLoading={isLoading}
                      onChange={(value) => this.handleChangeSelect('categories', value)}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled hasRows>
              <ModalLineContentStyled alignCenter hasRows>
                <ModalLineTitleStyled>Public</ModalLineTitleStyled>
                <ModalLineTitleStyled autoWith>
                  <LineFormStyled noMargin autoWidth>
                    <Field
                      type="radio"
                      name={'status'}
                      component={renderField}
                      value="public"
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignCenter hasRows>
                <ModalLineTitleStyled>Private</ModalLineTitleStyled>
                <ModalLineTitleStyled autoWith>
                  <LineFormStyled noMargin autoWidth>
                    <Field
                      type="radio"
                      name={'status'}
                      component={renderField}
                      value="private"
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled>
                {
                  ((submitSucceeded && project.error) || (submitFailed && error)) &&
                  <TextErrorStyled error={true}>
                    {project.error || error}
                  </TextErrorStyled>
                }
                {
                  submitting || project.isLoading ?
                    <Button hasBorder btnModal disabled>
                      <i className="fa fa-circle-o-notch fa-spin" />Loading
                    </Button>
                  :
                    <Button type='submit' btnModal hasBorder>
                      {loadedProject ? 'Update' : 'Create'}
                    </Button>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
          </ModalContentStyled>
        </form>
      </Modal>
    );
  }
}

ModalCreatingProject.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loadAllCategoryNames: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  resetCategories: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  resetProjectType: PropTypes.func.isRequired,
  loadAllUsers: PropTypes.func.isRequired,
  resetUsers: PropTypes.func.isRequired,
  loadingUsers: PropTypes.bool.isRequired,
  loadedProject: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  projectType: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  project: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({
  project: state.project,
  categories: state.management.categories,
  loadedProject: state.layout.project,
  projectType: state.project.projectType,
  isLoading: state.management.isLoading,
  users: state.account.users.map(user => ({
    value: user.id,
    label: user.username,
    id: user.id,
    email: user.email,
    avatarURL: user.profile && user.profile.avatarURL
  })),
  loadingUsers: state.account.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createProject: createProject,
  loadAllCategoryNames: loadAllCategoryNames,
  resetProject: resetProject,
  updateProject: updateProject,
  loadAllUsers: loadAllUsers,
  resetProjectType: resetProjectType,
  resetCategories: resetCategories,
  resetUsers: resetUsers
}, dispatch);

export default reduxForm({
  form: 'CreateProjectForm'
})(connect(mapStateToProps, mapDispatchToProps)(ModalCreatingProject));
