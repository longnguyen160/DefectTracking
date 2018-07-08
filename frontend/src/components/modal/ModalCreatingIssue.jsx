import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Modal from './Modal';
import {
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalContentStyled,
  ModalLineStyled,
  ModalLineContentStyled,
  ModalLineTitleStyled
} from '../../stylesheets/Modal';
import {
  LineFormStyled,
  FilterBoxWrapperStyled,
  TitleElementStyled,
  Image,
  TextErrorStyled
} from '../../stylesheets/GeneralStyled';
import { Button } from '../../stylesheets/Button';
import Icon from '../icon/Icon';
import {
  ICONS,
  SELECT,
  INPUT_TEXT,
  TEXT_AREA,
  FILE,
  DATETIME_PICKER,
  CREATABLE,
  ISSUE_PRIORITY_ARRAY,
  FILE_BASE_URL
} from '../../utils/enums';
import InputField from '../form/InputField';
import { validateForm } from '../../utils/ultis';
import { createIssue } from '../../modules/issue/actions/issue';
import { deleteFile, resetState, uploadFile } from '../../modules/file/actions/file';
import { loadAllUsersInProject } from '../../modules/projects/actions/usersInProject';
import { loadAllCategoriesInProject, resetAllCategories } from '../../modules/layout/actions/layout';

class ModalCreatingIssue extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: []
    };

  }

  componentDidMount() {
    const { selectedProject, change, user, loadAllUsersInProject, loadAllCategoriesInProject } = this.props;

    if (selectedProject) {
      change('projectId', selectedProject.id);
      loadAllUsersInProject(selectedProject.id);
      loadAllCategoriesInProject(selectedProject.id);
    }
    change('reporter', user.id);
  }

  componentWillUnmount() {
    const { resetState, resetAllCategories } = this.props;

    resetState();
    resetAllCategories();
  }

  onDrop = (files) => {
    const { uploadFile } = this.props;
    const { uploadedFile } = this.state;
    const attachments = new FormData();

    Object.keys(files).filter(element => element !== 'preventDefault').map((file) =>{
      attachments.append('files', files[file]);
      uploadedFile.push(files[file]);
      this.setState({ uploadedFile });
    });

    uploadFile(attachments);
  };

  handleCreateIssue = (values) => {
    const { createIssue, onClose, fileIds } = this.props;

    if (validateForm.required(values.projectId)) {
      throw new SubmissionError({ _error: 'Project is required' });
    }
    if (validateForm.required(values.issueName)) {
      throw new SubmissionError({ _error: 'Summary is required' });
    }
    if (moment(values.dueDate).isBefore(moment(new Date()))) {
      throw new SubmissionError({ _error: 'Due date is invalid' });
    }

    let watchers = [values.reporter];

    if (values.reporter !== values.assignee) {
      watchers.push(values.assignee);
    }

    createIssue(
      {
        ...values,
        attachments: fileIds,
        watchers,
        dueDate: moment(values.dueDate).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
        createdAt: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
        updatedAt: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      }, () => {
      onClose();
    })
  };

  handleDeleteAttachment = (fileId, index) => {
    const { deleteFile } = this.props;

    this.setState(prevState => ({
      uploadedFile: prevState.uploadedFile.filter((file, i) => i !== index)
    }));

    deleteFile(fileId);
  };

  render() {
    const {
      onClose,
      isOpen,
      handleSubmit,
      projects,
      user,
      issue,
      pristine,
      submitting,
      error,
      submitFailed,
      submitSucceeded,
      fileIds,
      usersInProject,
      categories
    } = this.props;
    const { uploadedFile } = this.state;

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'600px'}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Create Issue</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <form
          onSubmit={handleSubmit(this.handleCreateIssue)}
          id="CreateIssueForm"
        >
          <ModalContentStyled>
            <ModalLineStyled hasRows>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Project</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled reactSelect>
                    <InputField
                      name={'projectId'}
                      type={SELECT}
                      options={projects}
                      searchable={false}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Priority</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled reactSelect>
                    <InputField
                      name={'priority'}
                      type={SELECT}
                      options={ISSUE_PRIORITY_ARRAY}
                      searchable={false}
                      renderCustom
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Summary</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={INPUT_TEXT}
                      name={'issueName'}
                      placeholder={'Summary...'}
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
                      renderType={'textarea'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Reporter</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={SELECT}
                      name={'reporter'}
                      placeholder={'Reporter...'}
                      options={[
                        { value: user.id, label: user.username, avatarURL: user.profile.avatarURL }
                      ]}
                      renderCustom
                      disabled={true}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Attachment</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled fullWidth>
                    <InputField
                      name={'attachments'}
                      type={FILE}
                      renderType={'file'}
                      onDrop={this.onDrop}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
                <ModalLineContentStyled>
                  {
                    uploadedFile.map((file, index) => (
                      <FilterBoxWrapperStyled key={fileIds[index]}>
                        {
                          file.type && file.type.includes('image') ?
                            <Image project src={FILE_BASE_URL + fileIds[index]} />
                          :
                            <Icon icon={ICONS.ATTACHMENT} color={'#1A1A1A'} width={30} height={30}/>
                        }
                        <TitleElementStyled padding={'10px 0'}>{file.name}</TitleElementStyled>
                        <Icon
                          icon={ICONS.DELETE}
                          color={'#1A1A1A'}
                          width={10}
                          height={10}
                          onClick={() => this.handleDeleteAttachment(fileIds[index], index)}
                          hoverPointer
                        />
                      </FilterBoxWrapperStyled>
                    ))
                  }
                </ModalLineContentStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Due Date</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={DATETIME_PICKER}
                      name={'dueDate'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled hasRows>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Assignee</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled reactSelect>
                    <InputField
                      name={'assignee'}
                      type={SELECT}
                      options={usersInProject}
                      renderCustom
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Categories</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled reactSelect>
                    <InputField
                      name={'categories'}
                      type={CREATABLE}
                      options={categories}
                      multi={true}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled>
                {
                  ((submitSucceeded && issue.error) || (submitFailed && error)) &&
                    <TextErrorStyled error={true}>
                      {issue.error || error}
                    </TextErrorStyled>
                }
                {
                  submitting || issue.isLoading ?
                    <Button hasBorder disabled>
                      <i className="fa fa-circle-o-notch fa-spin" />Loading
                    </Button>
                  :
                    <Button
                      hasBorder
                      type="submit"
                      form="CreateIssueForm"
                      disabled={pristine}
                    >
                      Create
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

ModalCreatingIssue.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loadAllUsersInProject: PropTypes.func.isRequired,
  resetAllCategories: PropTypes.func.isRequired,
  loadAllCategoriesInProject: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
  usersInProject: PropTypes.array.isRequired,
  selectedProject: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  createIssue: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  fileIds: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  issue: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({
  projects: state.project.projects.map(project => ({
    value: project.id,
    label: project.name
  })),
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
  user: state.layout.user,
  selectedProject: state.layout.selectedProject,
  issue: state.issue,
  fileIds: state.file.fileIds,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createIssue: createIssue,
  uploadFile: uploadFile,
  resetState: resetState,
  loadAllUsersInProject: loadAllUsersInProject,
  deleteFile: deleteFile,
  loadAllCategoriesInProject: loadAllCategoriesInProject,
  resetAllCategories: resetAllCategories
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CreateIssueForm'
})(ModalCreatingIssue));
