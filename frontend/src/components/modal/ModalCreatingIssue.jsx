import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Uppy from 'uppy/lib/core';
import Tus from 'uppy/lib/plugins/Tus';
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
  ISSUE_STATUS_ARRAY
} from '../../utils/enums';
import InputField from '../form/InputField';
import { validateForm } from '../../utils/ultis';
import { createIssue } from '../../modules/issue/actions/issue';

class ModalCreatingIssue extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: []
    };

  }

  componentWillMount() {
    this.uppy = new Uppy({ debug: true })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' });
  }

  componentDidMount() {
    const { selectedProject, change, user } = this.props;

    if (selectedProject) {
      change('projectId', selectedProject.id);
    }
    change('reporter', user.id);
    this.uppy.on('complete', (result) => {
      this.setState(prevState => {
        prevState.uploadedFile.push(...result.successful);

        return {
          uploadedFile: prevState.uploadedFile
        }
      });
    });
  }

  componentWillUnmount () {
    this.uppy.close();
  }

  handleCreateIssue = (values) => {
    const { createIssue, onClose } = this.props;

    if (validateForm.required(values.projectId)) {
      throw new SubmissionError({ _error: 'Project is required' });
    }
    if (validateForm.required(values.issueName)) {
      throw new SubmissionError({ _error: 'Summary is required' });
    }
    if (validateForm.required(values.assignee)) {
      throw new SubmissionError({ _error: 'Assignee is required' });
    }

    createIssue(
      {
        ...values,
        dueDate: moment(values.dueDate).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
        createdAt: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
      }, () => {
      onClose();
    })
  };

  handleDeleteAttachment = (fileURL) => {
    this.setState(prevState => ({
      uploadedFile: prevState.uploadedFile.filter(file => file.uploadURL !== fileURL)
    }));
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
      submitSucceeded
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
                      options={ISSUE_STATUS_ARRAY}
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
                <ModalLineTitleStyled>Reporter</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={SELECT}
                      name={'reporter'}
                      placeholder={'Reporter...'}
                      options={[
                        { value: user.id, label: user.username, ...user }
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
                      name={'attachment'}
                      type={FILE}
                      renderType={'file'}
                      uppy={this.uppy}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
                <ModalLineContentStyled>
                  {
                    uploadedFile.map(file => (
                      <FilterBoxWrapperStyled key={file.uploadURL}>
                        {
                          file.type && file.type.includes('image') ?
                            <Image project src={file.uploadURL}/>
                          :
                            <Icon icon={ICONS.ATTACHMENT} color={'#1A1A1A'} width={30} height={30}/>
                        }
                        <TitleElementStyled padding={'10px 0'}>{file.name}</TitleElementStyled>
                        <Icon
                          icon={ICONS.DELETE}
                          color={'#1A1A1A'}
                          width={10}
                          height={10}
                          onClick={() => this.handleDeleteAttachment(file.uploadURL)}
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
            <ModalLineStyled hasRows>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Assignee</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled reactSelect>
                    <InputField
                      name={'assignee'}
                      type={SELECT}
                      options={[
                        { value: 'Me', label: 'me' },
                      ]}
                      renderCustom
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Labels</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled reactSelect>
                    <InputField
                      name={'label'}
                      type={CREATABLE}
                      options={[]}
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
  projects: PropTypes.array.isRequired,
  selectedProject: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  createIssue: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
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
  user: state.layout.user,
  selectedProject: state.layout.selectedProject,
  issue: state.issue
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createIssue: createIssue
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CreateIssueForm'
})(ModalCreatingIssue));
