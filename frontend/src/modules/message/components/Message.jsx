import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SockJsClient from "react-stomp";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Editable from 'react-x-editable';
import {
  DescriptionElementStyled,
  ElementHeaderStyled,
  FilterBoxWrapperStyled,
  Image,
  LineFormStyled,
  TitleFormStyled
} from '../../../stylesheets/GeneralStyled';
import { FILE_BASE_URL, WEB_SOCKET_URL } from '../../../utils/enums';
import { ModalLineContentStyled, ModalLineTitleStyled } from '../../../stylesheets/Modal';
import moment from 'moment/moment';
import { deleteFile, uploadFile } from '../../file/actions/file';
import { createMessage, editMessage, loadAllMessages } from '../actions/message';
import CommentBox from './CommentBox';

class Message extends Component {

  componentWillMount() {
    const { loadAllMessages, issue } = this.props;

    if (issue) {
      loadAllMessages(issue.id, 'all');
    }
    this.editBox = {};
  }

  componentWillReceiveProps(nextProps) {
    const { loadAllMessages, issue } = this.props;

    if (JSON.stringify(issue) !== JSON.stringify(nextProps.issue)) {
      loadAllMessages(nextProps.issue.id, 'all');
    }
  }

  handleEdit = (messageId) => {
    this.editBox[messageId].setEditable(true);
  };

  handleSubmit = (event) => {
    const { editMessage } = this.props;

    editMessage({
      ...event.value,
      sender: event.value.sender.id,
    });
  };

  onMessageReceive = () => {
    const { loadAllMessages, issue } = this.props;

    loadAllMessages(issue.id, 'all');
  };

  renderLog = (message) => {
    return (
      <LineFormStyled hasTitle key={message.id}>
        <FilterBoxWrapperStyled top fullWidth>
          <Image topNav src={message.sender.avatarURL || '/images/default_avatar.jpg'} />
          <DescriptionElementStyled noPadding>
            <ElementHeaderStyled padding={'0'}>
              <TitleFormStyled username>{message.sender.username}</TitleFormStyled>
              <TitleFormStyled message>{message.message}</TitleFormStyled>
            </ElementHeaderStyled>
            <TitleFormStyled time>{moment(message.createdAt).format('LLL')}</TitleFormStyled>
          </DescriptionElementStyled>
        </FilterBoxWrapperStyled>
      </LineFormStyled>
    )
  };

  renderComment = (message) => {
    return (
      <LineFormStyled hasTitle key={message.id}>
        <FilterBoxWrapperStyled top fullWidth>
          <Image topNav src={message.sender.avatarURL || '/images/default_avatar.jpg'} />
          <DescriptionElementStyled noPadding notPointer>
            <Editable
              name={'message'}
              ref={(ref) => this.editBox[message.id] = ref}
              dataType={'custom'}
              mode={'inline'}
              showButtons={true}
              value={message}
              display={(value) => (
                <DescriptionElementStyled notPointer noPadding>
                  <ElementHeaderStyled padding={'0'}>
                    <TitleFormStyled username>{value.sender.username}</TitleFormStyled>
                    <TitleFormStyled time>{moment(value.createdAt).format('LLL')}</TitleFormStyled>
                    {
                      value.edited &&
                      <TitleFormStyled time>(edited)</TitleFormStyled>
                    }
                  </ElementHeaderStyled>
                  <TitleFormStyled message>{value.message}</TitleFormStyled>
                  {
                    value.attachments.map(fileId => (
                      <Image key={fileId} src={FILE_BASE_URL + fileId} />
                    ))
                  }
                </DescriptionElementStyled>
              )}
              customComponent={(props, state) => (
                <CommentBox
                  {...props}
                  {...state}
                />
              )}
              handleSubmit={this.handleSubmit}
            />
            <LineFormStyled noMargin>
              <TitleFormStyled
                detail
                onClick={() => this.handleEdit(message.id)}
              >
                Edit
              </TitleFormStyled>
              <TitleFormStyled detail>
                Delete
              </TitleFormStyled>
            </LineFormStyled>
          </DescriptionElementStyled>
        </FilterBoxWrapperStyled>
      </LineFormStyled>
    )
  };

  render() {
    const { messages } = this.props;

    return (
      <ModalLineContentStyled alignLeft maxImage>
        <LineFormStyled>
          <ModalLineTitleStyled>
            All
          </ModalLineTitleStyled>
          <ModalLineTitleStyled>
            Logs
          </ModalLineTitleStyled>
          <ModalLineTitleStyled>
            Comments
          </ModalLineTitleStyled>
        </LineFormStyled>
        <CommentBox />
        {
          messages.map(message => (
            message.type === 'logs' ? this.renderLog(message) : this.renderComment(message)
          ))
        }
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/message']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </ModalLineContentStyled>
    );
  }
}

Message.propTypes = {
  messages: PropTypes.array.isRequired,
  loadAllMessages: PropTypes.func.isRequired,
  editMessage: PropTypes.func.isRequired,
  issue: PropTypes.object,
};

const mapStateToProps = state => ({
  messages: state.message.messages,
  user: state.layout.user,
  issue: state.issue.issue
});

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  createMessage: createMessage,
  loadAllMessages: loadAllMessages,
  editMessage: editMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Message);
