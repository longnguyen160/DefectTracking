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
import { INPUT_TEXT, TEXT_AREA } from '../../utils/enums';
import { Button } from '../../stylesheets/Button';
import { validateForm } from '../../utils/ultis';
import { createProject, updateProject } from '../../modules/projects/actions/project';
import InputField from '../form/InputField';
import { loadAllCategories } from '../../modules/management/actions/category';
import { resetProject } from '../../modules/layout/actions/layout';


const renderField = (field) => {
  const { input, type, placeholder } = field;

  return (
    <Input type={type} placeholder={placeholder} {...input} />
  );
};

class ModalCreatingProject extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentWillMount() {
    const { loadAllCategories } = this.props;

    loadAllCategories();
  }

  componentWillReceiveProps(nextProps) {
    const { loadedProject } = nextProps;
    const { change } = this.props;

    if (JSON.stringify(loadedProject) !== JSON.stringify(this.props.loadedProject)) {
      change('name', loadedProject.name);
      change('description', loadedProject.description);
      change('status', loadedProject.status);
      this.setState({ categories: loadedProject.categories });
    }
  }

  componentWillUnmount() {
    const { resetProject } = this.props;

    resetProject();
  }

  handleChangeSelect = (values) => {
    this.setState({ categories: values.map(value => value.id) });
  };

  handleCreateProject = (values) => {
    const { name, description, status } = values;
    const { categories } = this.state;
    const { createProject, onClose, updateProject, loadedProject } = this.props;
    const handleFunction = loadedProject ? updateProject : createProject;

    if (validateForm.required(name)) {
      throw new SubmissionError({ _error: 'Name is required' });
    }
    if (validateForm.required(description)) {
      throw new SubmissionError({ _error: 'Description is required' });
    }
    if (validateForm.required(status)) {
      throw new SubmissionError({ _error: 'Status is required' });
    }

    handleFunction({
      project: {
        ...loadedProject,
        ...values
      },
      categories
    }, () => {
      onClose();
    });
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
      loadedProject
    } = this.props;
    const categoryValues = this.state.categories;

    return (
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>{loadedProject ? 'Update' : 'Create'} Project</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <form onSubmit={handleSubmit(this.handleCreateProject)} id="CreateProjectForm">
          <ModalContentStyled>
            <ModalLineStyled hasRow>
              <ModalLineContentStyled alignLeft>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Project Name</ModalLineTitleStyled>
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
                <ModalLineTitleStyled>Categories</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled fullWidthSelect>
                    <Select
                      placeholder={'Categories'}
                      options={categories}
                      valueKey={"id"}
                      labelKey={"name"}
                      value={categoryValues}
                      multi
                      onChange={this.handleChangeSelect}
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
  loadAllCategories: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  loadedProject: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  project: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({
  project: state.project,
  categories: state.management.categories,
  loadedProject: state.layout.project
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createProject: createProject,
  loadAllCategories: loadAllCategories,
  resetProject: resetProject,
  updateProject: updateProject
}, dispatch);

export default reduxForm({
  form: 'CreateProjectForm'
})(connect(mapStateToProps, mapDispatchToProps)(ModalCreatingProject));
