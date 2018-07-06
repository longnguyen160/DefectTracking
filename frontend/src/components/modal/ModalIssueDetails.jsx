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
  ModalBodyStyled
} from '../../stylesheets/Modal';
import {
  ElementHeaderStyled,
  Image,
  LineFormStyled,
  IssueStatusStyled,
  DropZoneStyled,
} from '../../stylesheets/GeneralStyled';
import {
  ICONS,
  INPUT_TEXT, ISSUE_DETAILS,
  ISSUE_PRIORITY_ARRAY,
  MESSAGE,
  MESSAGE_TYPE, ROLES,
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
import { createMessage } from '../../modules/message/actions/message';
import { loadProjectDetails, resetProject } from '../../modules/layout/actions/layout';

class ModalIssueDetails extends React.Component {

  state = {
    uploadedFile: [],
    userRole: this.props.user.roles.find(role => role !== ROLES.USER)
  };

  componentWillReceiveProps(nextProps) {
    const { issue, project } = nextProps;
    const { loadProjectDetails, user, selectedProject } = this.props;

    if (issue && !this.props.issue && !selectedProject) {
      loadProjectDetails(issue.projectId);
    }
    if (JSON.stringify(project) !== JSON.stringify(this.props.project)) {
      const userRole = project.members.find(member => member.userId === user.id).role;

      this.setState({ userRole });
    }
  }

  componentWillUnmount() {
    const { resetIssueDetails, resetProject } = this.props;

    resetIssueDetails();
    resetProject();
  }

  handleCreateMessage = (message) => {
    const { createMessage, issue, user } = this.props;

    createMessage({
      issueId: issue.id,
      message: message,
      type: MESSAGE_TYPE.LOGS,
      sender: user.id,
      attachments: [],
      createdAt: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      updatedAt: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
    });
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

    Object.keys(files).filter(element => element !== 'preventDefault').map((file) =>{
      attachments.append('files', files[file]);
      uploadedFile.push(files[file]);
      this.setState({ uploadedFile });
    });

    uploadFile(attachments, (fileIds) => {
      fileIds.map(fileId =>
        this.updateIssue('attachments', fileId)
      );
      this.handleCreateMessage(MESSAGE(fileIds.length).UPLOAD_ATTACHMENT);
    });
  };

  handleDeleteAttachment = (fileId) => {
    const { deleteFile } = this.props;

    deleteFile(fileId);
    this.updateIssue('attachments', fileId);
    this.handleCreateMessage(MESSAGE().DELETE_ATTACHMENT);
  };

  handleSubmit = (e) => {
    let value = null;
    let message = '';

    switch (e.props.name) {
      case 'priority':
        value = e.value.value;
        message = MESSAGE(ISSUE_PRIORITY_ARRAY.find(element => element.value === e.value.value).label).UPDATE_PRIORITY;
        break;

      case 'status':
        value = e.value.id;
        message = MESSAGE(e.value.name).CHANGE_STATUS;
        break;

      default:
        value = e.value.id ? e.value.id : e.value;
        if (e.props.name === 'issueName' || e.props.name === 'description') {
          message = MESSAGE(ISSUE_DETAILS[e.props.name]).UPDATE_ISSUE;
        } else if (e.props.name === 'assignee') {
          message = MESSAGE(e.value.username).CHANGE_ASSIGNEE;
        }
    }
    this.updateIssue(e.props.name, value);
    this.handleCreateMessage(message);
  };

  handleWatchingIssue = () => {
    const { user } = this.props;

    this.updateIssue('watchers', user.id);
  };

  onMessageReceive = () => {
    const { loadIssueDetails, issue } = this.props;

    loadIssueDetails(issue.id);
  };

  render() {
    const { onClose, isOpen, issue, user } = this.props;
    const { userRole } = this.state;
    const projectId = issue && issue.projectId;
    const priority = issue && ISSUE_PRIORITY_ARRAY.find(element => element.value === issue.priority);
    const isWatching = issue && issue.watchers.find(watcher => watcher.id === user.id);

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'750px'} isHidden={true} fullHeight={true}>
        <ModalHeaderStyled noMargin padding={'0'}>
          <ModalHeaderTitleStyled>
            <span>{issue && issue.issueKey}</span>
          </ModalHeaderTitleStyled>
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
          <ModalContentStyled flex={'0 0 540px'} padding={'0 10px'}>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
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
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled hasRows noMargin padding={'0 0 10px 0'} noPadding>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Categories</ModalLineTitleStyled>
                <LineFormStyled>
                  <span>aospdj</span>
                  <span>ddcds</span>
                  <span>scnskl</span>
                </LineFormStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Priority</ModalLineTitleStyled>
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
                      {...props}
                      {...state}
                    />
                  )}
                  handleSubmit={this.handleSubmit}
                />
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Description</ModalLineTitleStyled>
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
              <Message />
            </ModalLineStyled>
          </ModalContentStyled>
          <ModalContentStyled padding={'0 10px'} fullWidth>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Status</ModalLineTitleStyled>
                {
                  issue && issue.status.handlers.includes(userRole) ?
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
                    <LineFormStyled hover>
                      <IssueStatusStyled status={issue && issue.status}>{issue && issue.status.name}</IssueStatusStyled>
                    </LineFormStyled>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Reporter</ModalLineTitleStyled>
                <LineFormStyled>
                  <ElementHeaderStyled padding={'0'}>
                    <Image topNav src={issue && issue.reporter.avatarURL ?  issue.reporter.avatarURL : '/images/default_avatar.jpg'} margin={'0 5px'} />
                    <span>{issue && issue.reporter.username}</span>
                  </ElementHeaderStyled>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Assignee</ModalLineTitleStyled>
                <Editable
                  name={'assignee'}
                  dataType={'custom'}
                  mode={'inline'}
                  value={issue && { ...issue.assignee, projectId }}
                  showButtons={true}
                  display={(value) => (
                    <LineFormStyled hover>
                      <ElementHeaderStyled padding={'0'}>
                        <Image topNav src={value.avatarURL? value.avatarURL : '/images/default_avatar.jpg'} margin={'0 5px'} />
                        <span>{value.username}</span>
                      </ElementHeaderStyled>
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
                <ModalLineTitleStyled>Created At</ModalLineTitleStyled>
                <LineFormStyled>
                  <span>{moment(issue && issue.createdAt).format('LLL')}</span>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Updated At</ModalLineTitleStyled>
                <LineFormStyled>
                  <span>{moment(issue && issue.updatedAt).format('LLL')}</span>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
          </ModalContentStyled>
        </ModalBodyStyled>
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/issuesList']}
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
  issue: PropTypes.object,
  selectedProject: PropTypes.object,
  project: PropTypes.object,
  user: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  issue: state.issue.issue,
  messages: state.message.messages,
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
  resetProject: resetProject
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalIssueDetails);
