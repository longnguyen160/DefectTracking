import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ICONS, MESSAGE_TYPE } from '../../../utils/enums';
import {
  DropZoneStyled,
  Image,
  TextArea,
  ElementHeaderStyled,
  InputCommentStyled,
  LineFormStyled,
} from '../../../stylesheets/GeneralStyled';
import Attachment from '../../../components/attachment/Attachment';
import moment from 'moment/moment';
import { createMessage, editMessage } from '../actions/message';
import { deleteFile, uploadFile } from '../../file/actions/file';
import Icon from '../../../components/icon/Icon';

class CommentBox extends Component {

  state = {
    fileIds: this.props.value ? this.props.value.attachments : [],
    textareaHeight: '46px',
    value: this.props.value
  };

  onDrop = (files) => {
    const { uploadFile, setValueToAnchor } = this.props;
    let { value } = this.props;
    const attachments = new FormData();

    Object.keys(files).filter(element => element !== 'preventDefault').map((file) =>{
      attachments.append('files', files[file]);
    });

    uploadFile(attachments, (response) => {
      let { fileIds } = this.state;

      fileIds = fileIds.concat(response);
      this.setState({ fileIds });
      if (value) {
        value = Object.assign({}, value, {
          attachments: fileIds
        });

        setValueToAnchor(value);
      }
    });
  };

  handleDeleteAttachment = (fileId) => {
    const { deleteFile, setValueToAnchor } = this.props;
    let { value } = this.props;
    const { fileIds } = this.state;

    deleteFile(fileId);
    const newFileIds = fileIds.filter(id => id !== fileId);

    this.setState({ fileIds: newFileIds });

    if (value) {
      value = Object.assign({}, value, {
        attachments: newFileIds
      });

      setValueToAnchor(value);
    }
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && this.message.value.length > 0) {
      event.preventDefault();
      this.sendMessage(event);
      this.setState({ textareaHeight: '46px' });
    } else {
      this.message.style.height = 'auto';
      const height = Math.min(20 * 5, this.message.scrollHeight);

      this.setState({ textareaHeight: `${height}px` });
      this.message.style.height = '';
    }
  };

  setValue = (event) => {
    let { value } = this.props;

    if (value) {
      const { setValueToAnchor } = this.props;
      value = Object.assign({}, value, {
        message: event.target.value
      });
      this.setState({ value });
      setValueToAnchor(value, event);
    }
  };

  sendMessage = (event) => {
    const { createMessage, issue, user, onSubmit } = this.props;
    const { fileIds } = this.state;
    let { value } = this.props;

    if (!value) {
      createMessage({
        issueId: issue.id,
        message: this.message.value,
        type: MESSAGE_TYPE.COMMENTS,
        sender: user.id,
        attachments: fileIds,
        createdAt: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
        updatedAt: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
      });
      this.message.value = '';
      this.setState({ fileIds: [] });
    } else {
      this.setValue(event);
      onSubmit();
    }
  };

  render() {
    const { user } = this.props;
    const { fileIds, textareaHeight, value } = this.state;

    return (
      <ElementHeaderStyled padding={'0'} top margin={'0 0 15px 0'}>
        {
          !value &&
            <Image topNav src={user.profile.avatarURL} margin={'0 5px'}/>
        }
        <InputCommentStyled>
          <LineFormStyled noMargin>
            {
              fileIds.map(fileId => (
                <Attachment
                  key={fileId}
                  fileId={fileId}
                  height={'100%'}
                  width={'100px'}
                  type={'comment'}
                  handleDeleteAttachment={() => this.handleDeleteAttachment(fileId)}
                />
              ))
            }
          </LineFormStyled>
          <TextArea
            placeholder={'Comment...'}
            height={textareaHeight}
            innerRef={(mess) => { this.message = mess; }}
            onKeyDown={this.handleKeyPress}
            value={value && value.message}
            onChange={this.setValue}
          />
          <LineFormStyled noMargin>
            <DropZoneStyled
              hidden
              onDrop={this.onDrop}
              innerRef={(ref) => this.file = ref}
            />
            <Icon
              icon={ICONS.ATTACHMENT}
              color={'#626262'}
              width={20}
              height={20}
              hoverPointer
              onClick={() => this.file.open()}
            />
          </LineFormStyled>
        </InputCommentStyled>
      </ElementHeaderStyled>
    )
  }
}

CommentBox.propTypes = {
  user: PropTypes.object.isRequired,
  issue: PropTypes.object,
  value: PropTypes.object,
  createMessage: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  setValueToAnchor: PropTypes.func,
  onSubmit: PropTypes.func,
  setEditable: PropTypes.func,
  editMessage: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  user: state.layout.user,
  issue: state.issue.issue
});

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  createMessage: createMessage,
  editMessage: editMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
