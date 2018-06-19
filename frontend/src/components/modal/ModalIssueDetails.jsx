import React from 'react';
import PropTypes from 'prop-types';
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
  ModalLineTitleStyled,
  ModalBodyStyled
} from '../../stylesheets/Modal';
import {
  DescriptionElementStyled,
  ElementHeaderStyled,
  FilterBoxWrapperStyled,
  Image,
  LineFormStyled,
  TitleElementStyled,
  Input,
  IssueStatusStyled,
  DropZoneStyled
} from '../../stylesheets/GeneralStyled';
import {ICONS, ISSUE_STATUS_ARRAY} from '../../utils/enums';
import Icon from '../icon/Icon';
import {deleteFile, uploadFile} from '../../modules/file/actions/file';
import Attachment from '../attachment/Attachment';

class ModalIssueDetails extends React.Component {

  state = {
    uploadedFile: []
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

    uploadFile(attachments);
  };

  handleDeleteAttachment = (fileId) => {
    const { deleteFile } = this.props;

    deleteFile(fileId);
  };

  render() {
    const { onClose, isOpen, issue, user } = this.props;

    const priority = issue && ISSUE_STATUS_ARRAY.find(element => element.value === issue.priority);

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'750px'} isHidden={true} fullHeight={true}>
        <ModalHeaderStyled noMargin>
          <ModalHeaderTitleStyled>
            <span>{issue && issue.issueKey}</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <ModalBodyStyled padding={'10px 0'}>
          <ModalContentStyled flex={'0 0 540px'} padding={'0 10px'}>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>
                  {issue && issue.issueName}
                </ModalLineTitleStyled>
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
                <LineFormStyled>
                  <Icon
                    icon={ICONS.ARROW}
                    color={priority && priority.color}
                    width={15}
                    height={15}
                    rotated rotate={'rotateZ(90deg)'}
                  />
                  <span>{issue && priority.label}</span>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Description</ModalLineTitleStyled>
                <LineFormStyled>
                  <span>
                    {issue && issue.description}
                  </span>
                </LineFormStyled>
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
                      <Attachment fileId={fileId} handleDeleteAttachment={() => this.handleDeleteAttachment(fileId)}/>
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
          <ModalContentStyled padding={'0 10px'}>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Status</ModalLineTitleStyled>
                <LineFormStyled>
                  <IssueStatusStyled status={issue && issue.status}>{issue && issue.status}</IssueStatusStyled>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Reporter</ModalLineTitleStyled>
                <LineFormStyled>
                  <ElementHeaderStyled padding={'0'}>
                    <Image topNav src={issue && issue.reporter.avatarURL} margin={'0 5px'} />
                    <span>{issue && issue.reporter.username}</span>
                  </ElementHeaderStyled>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Assignee</ModalLineTitleStyled>
                <LineFormStyled>
                  <ElementHeaderStyled padding={'0'}>
                    <Image topNav src={issue && issue.assignee.avatarURL} margin={'0 5px'} />
                    <span>{issue && issue.assignee.username}</span>
                  </ElementHeaderStyled>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled noMargin padding={'0 0 10px 0'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Watchers</ModalLineTitleStyled>
                <LineFormStyled hasTitle>
                  <ElementHeaderStyled padding={'0'}>
                    <Image topNav src={'/images/default_avatar.jpg'} margin={'0 5px'} />
                    <span>bim beo</span>
                  </ElementHeaderStyled>
                  <ElementHeaderStyled padding={'0'}>
                    <Image topNav src={'/images/default_avatar.jpg'} margin={'0 5px'} />
                    <span>bim bim</span>
                  </ElementHeaderStyled>
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
      </Modal>
    );
  }
}

ModalIssueDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  issue: PropTypes.object,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  issue: state.issue.issue,
  user: state.layout.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadFile: uploadFile,
  deleteFile: deleteFile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalIssueDetails);
