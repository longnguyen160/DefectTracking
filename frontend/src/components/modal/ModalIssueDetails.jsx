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
  DescriptionElementStyled,
  ElementHeaderStyled,
  FilterBoxWrapperStyled,
  Image,
  LineFormStyled,
  Input,
  IssueStatusStyled,
  DropZoneStyled
} from '../../stylesheets/GeneralStyled';
import { ICONS, INPUT_TEXT, ISSUE_PRIORITY_ARRAY, TEXT_AREA, WEB_SOCKET_URL } from '../../utils/enums';
import Icon from '../icon/Icon';
import { deleteFile, uploadFile } from '../../modules/file/actions/file';
import Attachment from '../attachment/Attachment';
import { loadIssueDetails, resetIssueDetails, updateIssue } from '../../modules/issue/actions/issue';
import CustomInput from '../editable/CustomInput';
import CustomSelect from '../editable/CustomSelect';
import CustomSelectStatus from '../editable/CustomSelectStatus';

class ModalIssueDetails extends React.Component {

  state = {
    uploadedFile: []
  };

  componentWillUnmount() {
    const { resetIssueDetails } = this.props;

    resetIssueDetails();
  }

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
    });
  };

  handleDeleteAttachment = (fileId) => {
    const { deleteFile } = this.props;

    deleteFile(fileId);
    this.updateIssue('attachments', fileId);
  };

  handleSubmit = (e) => {
    let value = null;

    switch (e.props.name) {
      case 'priority':
        value = e.value.value;
        break;

      default:
        value = e.value.id ? e.value.id : e.value;
    }
    this.updateIssue(e.props.name, value);
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
    const projectId = issue && issue.projectId;
    const priority = issue && ISSUE_PRIORITY_ARRAY.find(element => element.value === issue.priority);
    const isWatching = issue && issue.watchers.find(watcher => watcher.id === user.id);

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'750px'} isHidden={true} fullHeight={true}>
        <ModalHeaderStyled noMargin padding={'0 0 10px 0'}>
          <ModalHeaderTitleStyled>
            <span>{issue && issue.issueKey}</span>
          </ModalHeaderTitleStyled>
          <Icon
            icon={isWatching ? ICONS.EYE : ICONS.EYE_CROSS}
            width={20}
            height={20}
            color={'#626262'}
            hoverPointer
            onClick={() => this.handleWatchingIssue()}
          />
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
                <ModalLineTitleStyled>Label</ModalLineTitleStyled>
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
                      <Attachment key={fileId} fileId={fileId} handleDeleteAttachment={() => this.handleDeleteAttachment(fileId)}/>
                    ))
                  }
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineTitleStyled alignLeft>
                <ModalLineTitleStyled>Comments</ModalLineTitleStyled>
                <LineFormStyled>
                  <FilterBoxWrapperStyled>
                    <Image topNav src={'/images/default_avatar.jpg'} />
                    <DescriptionElementStyled>
                      <ElementHeaderStyled padding={'0'}>
                        <span>bim beo</span>
                        <span>2 hour ago</span>
                      </ElementHeaderStyled>
                      <span>Hello</span>
                    </DescriptionElementStyled>
                  </FilterBoxWrapperStyled>
                </LineFormStyled>
                <ElementHeaderStyled padding={'0'}>
                  <Image topNav src={user.profile.avatarURL} margin={'0 5px'} />
                  <Input placeholder={'Comment...'} />
                </ElementHeaderStyled>
              </ModalLineTitleStyled>
            </ModalLineStyled>
          </ModalContentStyled>
          <ModalContentStyled padding={'0 10px'} fullWidth>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Status</ModalLineTitleStyled>
                <Editable
                  name={'status'}
                  dataType={'custom'}
                  mode={'inline'}
                  value={issue && issue.status}
                  showButtons={true}
                  display={(value) => (
                    <LineFormStyled hover>
                      <IssueStatusStyled status={value}>{value}</IssueStatusStyled>
                    </LineFormStyled>
                  )}
                  customComponent={(props, state) => (
                    <CustomSelectStatus
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
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Watchers</ModalLineTitleStyled>
                <LineFormStyled hasTitle>
                  {
                    issue && issue.watchers.map(watcher => (
                      <ElementHeaderStyled padding={'0'} key={watcher.id}>
                        <Image topNav src={watcher.avatarURL ? watcher.avatarURL : '/images/default_avatar.jpg'} margin={'0 5px'} />
                        <span>{watcher.username}</span>
                      </ElementHeaderStyled>
                    ))
                  }
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
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
  issue: PropTypes.object,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  issue: state.issue.issue,
  user: state.layout.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  updateIssue: updateIssue,
  loadIssueDetails: loadIssueDetails,
  resetIssueDetails: resetIssueDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalIssueDetails);
