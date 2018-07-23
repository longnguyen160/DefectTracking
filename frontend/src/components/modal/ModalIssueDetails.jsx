import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Editable from 'react-x-editable';
import SockJsClient from "react-stomp";
import Modal from './Modal';
import {
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalContentStyled,
  ModalLineStyled,
  ModalLineContentStyled,
  ModalLineTitleStyled,
  ModalBodyStyled,
  ModalCloseStyle
} from '../../stylesheets/Modal';
import {
  ElementHeaderStyled,
  Image,
  LineFormStyled,
  IssueStatusStyled,
  DropZoneStyled,
  LabelStyled,
} from '../../stylesheets/GeneralStyled';
import { PlaceHolder } from '../../stylesheets/PlaceHolder';
import {
  FILE_BASE_URL,
  ICONS,
  INPUT_TEXT,
  ISSUE_DETAILS,
  ISSUE_PRIORITY_ARRAY,
  MESSAGE,
  MESSAGE_TYPE,
  ROLES,
  TEXT_AREA,
  WEB_SOCKET_URL
} from '../../utils/enums';
import Icon from '../icon/Icon';
import { deleteFile, uploadFile } from '../../modules/file/actions/file';
import Attachment from '../attachment/Attachment';
import { loadIssueDetails, resetIssueDetails, updateIssue } from '../../modules/issue/actions/issue';
import CustomInput from '../editable/CustomInput';
import CustomSelect from '../editable/CustomSelect';
import CustomSelectStatus from '../editable/CustomSelectStatus';
import Message from '../../modules/message/components/Message';
import { createMessage, resetMessage } from '../../modules/message/actions/message';
import { loadProjectDetails, resetProject } from '../../modules/layout/actions/layout';

class ModalIssueDetails extends React.Component {

  state = {
    uploadedFile: [],
    userRole: this.props.user && this.props.user.roles.find(role => role !== ROLES.USER)
  };

  componentWillReceiveProps(nextProps) {
    const { issue, project, user } = nextProps;
    const { loadProjectDetails, selectedProject } = this.props;

    if (issue && !this.props.issue && !selectedProject) {
      loadProjectDetails(issue.projectId);
    }
    if (user && JSON.stringify(project) !== JSON.stringify(this.props.project)) {
      const userRole = project.members.find(member => member.userId === user.id).role;

      this.setState({ userRole });
    }
  }

  componentWillUnmount() {
    const { resetIssueDetails, resetProject, resetMessage } = this.props;

    resetIssueDetails();
    resetProject();
    resetMessage();
  }

  handleCreateMessage = (message, type) => {
    const { createMessage, issue, user } = this.props;

    createMessage({
      issueId: issue.id,
      message: message,
      type,
      sender: user.id,
      attachments: [],
      createdAt: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      updatedAt: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
    }, false);
  };

  updateIssue = (type, value) => {
    const { updateIssue, issue } = this.props;

    updateIssue({
      issueId: issue.id,
      type,
      value
    });
  };

  onDrop = (files) => {
    const { uploadFile } = this.props;
    const { uploadedFile } = this.state;
    const attachments = new FormData();
    const type = {
      entityName: MESSAGE_TYPE.LOGS
    };

    Object.keys(files).filter(element => element !== 'preventDefault').map((file) =>{
      attachments.append('files', files[file]);
      uploadedFile.push(files[file]);
      this.setState({ uploadedFile });
    });

    uploadFile(attachments, (fileIds) => {
      fileIds.map(fileId =>
        this.updateIssue('attachments', fileId)
      );
      this.handleCreateMessage(MESSAGE(fileIds.length).UPLOAD_ATTACHMENT, type);
    });
  };

  handleDeleteAttachment = (fileId) => {
    const { deleteFile } = this.props;
    const type = {
      entityName: MESSAGE_TYPE.LOGS
    };

    deleteFile(fileId);
    this.updateIssue('attachments', fileId);
    this.handleCreateMessage(MESSAGE().DELETE_ATTACHMENT, type);
  };

  handleSubmit = (e) => {
    let value = null;
    let message = '';

    switch (e.props.name) {
      case 'priority':
        value = e.value ? e.value.value : null;
        message = MESSAGE(ISSUE_PRIORITY_ARRAY.find(element => element.value === e.value.value).label).UPDATE_PRIORITY;
        break;

      case 'status':
        value = e.value ? e.value.id : null;
        message = MESSAGE(e.value.name).CHANGE_STATUS;
        break;

      case 'categories':
        value = e.value ? e.value.map(category => category.id) : [];
        message = MESSAGE().UPDATE_CATEGORIES;
        break;

      case 'issueName':
      case 'description':
        value = e.value;
        message = MESSAGE(ISSUE_DETAILS[e.props.name]).UPDATE_ISSUE;
        break;

      default:
        value = (e.value && e.value.id) || '';

        if (e.props.name === 'assignee') {
          message = MESSAGE(e.value ? e.value.username : null).CHANGE_ASSIGNEE;
        }
    }
    const type = {
      entityName: MESSAGE_TYPE.LOGS,
      entityType: e.props.name,
      entityId: e.props.name === 'categories' ? [] : value
    };

    this.updateIssue(e.props.name, value);
    this.handleCreateMessage(message, type);
  };

  handleWatchingIssue = () => {
    const { user } = this.props;

    this.updateIssue('watchers', user.id);
  };

  onMessageReceive = () => {
    const { loadIssueDetails, issue } = this.props;

    loadIssueDetails(issue.id, false);
  };

  render() {
    const { onClose, isOpen, issue, loadingIssue, user } = this.props;
    const { userRole } = this.state;
    const projectId = issue && issue.projectId;
    const priority = issue && ISSUE_PRIORITY_ARRAY.find(element => element.value === issue.priority);
    const categories = issue && issue.categories.map(category => ({
      ...category,
      value: category.id,
      label: category.name
    }));
    const assignee = issue && issue.assignee && Object.assign(issue.assignee, {
      value: issue.assignee.id,
      label: issue.assignee.username
    });
    const checkUserInIssue = (issue && issue.watchers.find(watcher => watcher && watcher.id === user.id)) || (userRole === ROLES.ADMIN || userRole === ROLES.MANAGER);
    // const isWatching = issue && issue.watchers.find(watcher => watcher.id === user.id);

    return (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        maxWidth={'950px'}
        isHidden={true}
        fullHeight={true}
        padding={'20px 20px 35px'}
      >
        <ModalHeaderStyled padding={'0'}>
          <ModalHeaderTitleStyled>
            {
              loadingIssue ?
                <PlaceHolder />
              :
                <span>{issue && issue.issueKey}</span>
            }
          </ModalHeaderTitleStyled>
          <ModalCloseStyle>
            <Icon
              icon={ICONS.DELETE}
              width={15}
              height={15}
              color={'#626262'}
              hoverPointer
              onClick={() => onClose()}
            />
          </ModalCloseStyle>
          {/*<Icon*/}
            {/*icon={isWatching ? ICONS.EYE : ICONS.EYE_CROSS}*/}
            {/*width={20}*/}
            {/*height={20}*/}
            {/*color={'#626262'}*/}
            {/*hoverPointer*/}
            {/*onClick={() => this.handleWatchingIssue()}*/}
          {/*/>*/}
        </ModalHeaderStyled>
        <ModalBodyStyled padding={'10px 0'}>
          <ModalContentStyled flex={'0 0 715px'} padding={'0 10px'}>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                {
                  loadingIssue ?
                    <PlaceHolder />
                  :
                    checkUserInIssue ?
                      <Editable
                        name={'issueName'}
                        dataType={'custom'}
                        mode={'inline'}
                        value={issue && issue.issueName}
                        showButtons={true}
                        display={(value) => (
                          <ModalLineTitleStyled hover>
                            {value}
                          </ModalLineTitleStyled>
                        )}
                        customComponent={(props, state) => (
                          <CustomInput
                            {...props}
                            {...state}
                            renderType={INPUT_TEXT}
                          />
                        )}
                        handleSubmit={this.handleSubmit}
                      />
                    :
                      <ModalLineTitleStyled>
                        {issue && issue.issueName}
                      </ModalLineTitleStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled hasRows noMargin padding={'0 0 10px 0'} noPadding>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Categories</ModalLineTitleStyled>
                {
                  loadingIssue ?
                    <PlaceHolder />
                  :
                    checkUserInIssue ?
                      <Editable
                        name={'categories'}
                        dataType={'custom'}
                        mode={'inline'}
                        value={issue && { categories, projectId }}
                        showButtons={true}
                        display={(value) => (
                          <LineFormStyled hover wrap>
                            {
                              value.categories && value.categories.length > 0 ?
                                value.categories.map(category => (
                                  <LabelStyled
                                    background={category.background}
                                    color={category.color}
                                    key={category.id}
                                  >
                                    {category.name}
                                  </LabelStyled>
                                ))
                                :
                                <LabelStyled>
                                </LabelStyled>
                            }
                          </LineFormStyled>
                        )}
                        customComponent={(props, state) => (
                          <CustomSelect
                            multi={true}
                            {...props}
                            {...state}
                          />
                        )}
                        handleSubmit={this.handleSubmit}
                      />
                    :
                      <LineFormStyled wrap>
                        {
                          issue && issue.categories.map(category => (
                            <LabelStyled
                              background={category.background}
                              color={category.color}
                              key={category.id}
                            >
                              {category.name}
                            </LabelStyled>
                          ))
                        }
                      </LineFormStyled>
                }
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Priority</ModalLineTitleStyled>
                {
                  loadingIssue ?
                    <PlaceHolder />
                  :
                    checkUserInIssue ?
                      <Editable
                        name={'priority'}
                        dataType={'custom'}
                        mode={'inline'}
                        value={issue && priority}
                        showButtons={true}
                        options={ISSUE_PRIORITY_ARRAY}
                        display={(value) => (
                          <LineFormStyled hover>
                            <Icon
                              icon={ICONS.ARROW}
                              color={value.color}
                              width={15}
                              height={15}
                              rotated rotate={'rotateZ(90deg)'}
                            />
                            <span>{value.label}</span>
                          </LineFormStyled>
                        )}
                        customComponent={(props, state) => (
                          <CustomSelect
                            renderCustom={true}
                            clearable={false}
                            {...props}
                            {...state}
                          />
                        )}
                        handleSubmit={this.handleSubmit}
                      />
                    :
                      issue &&
                        <LineFormStyled>
                          <Icon
                            icon={ICONS.ARROW}
                            color={priority.color}
                            width={15}
                            height={15}
                            rotated rotate={'rotateZ(90deg)'}
                          />
                          <span>{priority.label}</span>
                        </LineFormStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Description</ModalLineTitleStyled>
                {
                  loadingIssue ?
                    <PlaceHolder />
                  :
                    checkUserInIssue ?
                      <Editable
                        name={'description'}
                        dataType={'custom'}
                        mode={'inline'}
                        value={issue && issue.description}
                        showButtons={true}
                        display={(value) => (
                          <LineFormStyled hover>
                            <span>
                              {value}
                            </span>
                          </LineFormStyled>
                        )}
                        customComponent={(props, state) => (
                          <CustomInput
                            {...props}
                            {...state}
                            renderType={TEXT_AREA}
                          />
                        )}
                        handleSubmit={this.handleSubmit}
                      />
                    :
                      <LineFormStyled>
                        <span>
                          {issue && issue.description}
                        </span>
                      </LineFormStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Attachments</ModalLineTitleStyled>
                <LineFormStyled fullWidth>
                  <DropZoneStyled onDrop={this.onDrop}>
                    Dropping some files here, or click to select files to upload.
                  </DropZoneStyled>
                </LineFormStyled>
                <LineFormStyled>
                  {
                    issue && issue.attachments && issue.attachments.map(fileId => (
                      <Attachment
                        key={fileId}
                        fileId={fileId}
                        height={'125px'}
                        width={'156px'}
                        handleDeleteAttachment={() => this.handleDeleteAttachment(fileId)}
                      />
                    ))
                  }
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled padding={'5px 0'}>Activity</ModalLineTitleStyled>
                <Message />
              </ModalLineContentStyled>
            </ModalLineStyled>
          </ModalContentStyled>
          <ModalContentStyled padding={'0 10px'} fullWidth>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Status</ModalLineTitleStyled>
                {
                  issue && issue.status.handlers.includes(userRole) && checkUserInIssue ?
                    <Editable
                      name={'status'}
                      dataType={'custom'}
                      mode={'inline'}
                      value={issue && issue.status}
                      showButtons={true}
                      display={(value) => (
                        <LineFormStyled hover>
                          <IssueStatusStyled status={value}>{value.name}</IssueStatusStyled>
                        </LineFormStyled>
                      )}
                      customComponent={(props, state) => (
                        <CustomSelectStatus
                          userRole={userRole}
                          {...props}
                          {...state}
                        />
                      )}
                      handleSubmit={this.handleSubmit}
                    />
                  :
                    loadingIssue ?
                      <PlaceHolder />
                    :
                      <LineFormStyled hover>
                       <IssueStatusStyled status={issue && issue.status}>{issue && issue.status.name}</IssueStatusStyled>
                      </LineFormStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Reporter</ModalLineTitleStyled>
                {
                  loadingIssue ?
                    <PlaceHolder />
                  :
                    <LineFormStyled>
                      <ElementHeaderStyled padding={'0'}>
                        <Image
                          topNav
                          src={issue && issue.reporter.avatarURL ? FILE_BASE_URL + issue.reporter.avatarURL : '/images/default_avatar.jpg'}
                          margin={'0 5px'}
                        />
                        <span>{issue && issue.reporter.username}</span>
                      </ElementHeaderStyled>
                    </LineFormStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Assignee</ModalLineTitleStyled>
                {
                  loadingIssue ?
                    <PlaceHolder />
                  :
                    checkUserInIssue ?
                      <Editable
                        name={'assignee'}
                        dataType={'custom'}
                        mode={'inline'}
                        value={issue && { ...assignee, projectId }}
                        showButtons={true}
                        display={(value) => (
                          <LineFormStyled hover>
                            {
                              value.username ?
                                <ElementHeaderStyled padding={'0'}>
                                  <Image
                                    topNav
                                    src={value.avatarURL ? FILE_BASE_URL + value.avatarURL : '/images/default_avatar.jpg'}
                                    margin={'0 5px'}
                                  />
                                  <span>{value.username}</span>
                                </ElementHeaderStyled>
                                :
                                <ElementHeaderStyled padding={'0'}>
                                  <span>No assignee yet</span>
                                </ElementHeaderStyled>
                            }
                          </LineFormStyled>
                        )}
                        customComponent={(props, state) => (
                          <CustomSelect
                            renderCustom={true}
                            {...props}
                            {...state}
                          />
                        )}
                        handleSubmit={this.handleSubmit}
                      />
                    :
                      issue &&
                        <LineFormStyled>
                          {
                            assignee.username ?
                              <ElementHeaderStyled padding={'0'}>
                                <Image
                                  topNav
                                  src={assignee.avatarURL ? FILE_BASE_URL + assignee.avatarURL : '/images/default_avatar.jpg'}
                                  margin={'0 5px'}
                                />
                                <span>{assignee.username}</span>
                              </ElementHeaderStyled>
                            :
                              <ElementHeaderStyled padding={'0'}>
                                <span>No assignee yet</span>
                              </ElementHeaderStyled>
                          }
                        </LineFormStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            {/*<ModalLineStyled noMargin padding={'0 0 10px 0'}>*/}
              {/*<ModalLineContentStyled alignLeft>*/}
                {/*<ModalLineTitleStyled>Watchers</ModalLineTitleStyled>*/}
                {/*<LineFormStyled hasTitle>*/}
                  {/*{*/}
                    {/*issue && issue.watchers.map(watcher => (*/}
                      {/*<ElementHeaderStyled padding={'0'} key={watcher.id}>*/}
                        {/*<Image topNav src={watcher.avatarURL ? watcher.avatarURL : '/images/default_avatar.jpg'} margin={'0 5px'} />*/}
                        {/*<span>{watcher.username}</span>*/}
                      {/*</ElementHeaderStyled>*/}
                    {/*))*/}
                  {/*}*/}
                {/*</LineFormStyled>*/}
              {/*</ModalLineContentStyled>*/}
            {/*</ModalLineStyled>*/}
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Due Date</ModalLineTitleStyled>
                {
                  loadingIssue ?
                    <PlaceHolder />
                    :
                    <LineFormStyled>
                      <span>{moment(issue && issue.dueDate).format('LLL')}</span>
                    </LineFormStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            {
              issue && issue.finishedAt &&
                <ModalLineStyled noMargin padding={'0 0 10px 0'}>
                  <ModalLineContentStyled alignLeft>
                    <ModalLineTitleStyled>Finished at</ModalLineTitleStyled>
                    <LineFormStyled>
                      <span>{moment(issue && issue.finishedAt).format('LLL')}</span>
                    </LineFormStyled>
                  </ModalLineContentStyled>
                </ModalLineStyled>
            }
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Created At</ModalLineTitleStyled>
                {
                  loadingIssue ?
                    <PlaceHolder />
                  :
                    <LineFormStyled>
                     <span>{moment(issue && issue.createdAt).format('LLL')}</span>
                    </LineFormStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Updated At</ModalLineTitleStyled>
                {
                  loadingIssue ?
                    <PlaceHolder />
                  :
                    <LineFormStyled>
                     <span>{moment(issue && issue.updatedAt).format('LLL')}</span>
                    </LineFormStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
          </ModalContentStyled>
        </ModalBodyStyled>
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/issue/update']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </Modal>
    );
  }
}

ModalIssueDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  resetIssueDetails: PropTypes.func.isRequired,
  updateIssue: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  loadProjectDetails: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  issue: PropTypes.object,
  selectedProject: PropTypes.object,
  project: PropTypes.object,
  user: PropTypes.object.isRequired,
  loadingIssue: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  issue: state.issue.issue,
  loadingIssue: state.issue.isLoading,
  user: state.layout.user,
  selectedProject: state.layout.selectedProject,
  project: state.layout.project
});

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  updateIssue: updateIssue,
  loadIssueDetails: loadIssueDetails,
  resetIssueDetails: resetIssueDetails,
  createMessage: createMessage,
  loadProjectDetails: loadProjectDetails,
  resetProject: resetProject,
  resetMessage: resetMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalIssueDetails);
