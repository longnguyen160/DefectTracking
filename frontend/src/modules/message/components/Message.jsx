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
import { createMessage, editMessage, loadAllMessagesOnIssue } from '../actions/message';
import CommentBox from './CommentBox';

class Message extends Component {

  state = {
    activity: 'all'
  };

  componentWillMount() {
    const { loadAllMessagesOnIssue, issue } = this.props;
    const { activity } = this.state;

    if (issue) {
      loadAllMessagesOnIssue(issue.id, activity, true);
    }
    this.editBox = {};
  }

  componentWillReceiveProps(nextProps) {
    const { loadAllMessagesOnIssue, issue } = this.props;
    const { activity } = this.state;
    let loading = true;

    if (issue) {
      loading = false;
    }

    if (JSON.stringify(issue) !== JSON.stringify(nextProps.issue)) {
      loadAllMessagesOnIssue(nextProps.issue.id, activity, loading);
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

  handleChangeActivity = (activity) => {
    const { issue, loadAllMessagesOnIssue } = this.props;

    this.setState({ activity });
    loadAllMessagesOnIssue(issue.id, activity, true);
  };

  onMessageReceive = () => {
    const { loadAllMessagesOnIssue, issue } = this.props;

    loadAllMessagesOnIssue(issue.id, 'all', false);
  };

  renderLog = (message) => {
    return (
      <LineFormStyled hasTitle key={message.id}>
        <FilterBoxWrapperStyled top fullWidth>
          <Image topNav src={FILE_BASE_URL + message.sender.avatarURL || '/images/default_avatar.jpg'} />
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
          <Image topNav src={FILE_BASE_URL + message.sender.avatarURL || '/images/default_avatar.jpg'} />
          <DescriptionElementStyled noPadding notPointer>
            <Editable
              name={'message'}
              ref={(ref) => this.editBox[message.id] = ref}
              dataType={'custom'}
              mode={'inline'}
              showButtons={true}
              value={message}
              disabled={this.props.user.id !== message.sender.id}
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
            {
              this.props.user.id === message.sender.id &&
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
            }
          </DescriptionElementStyled>
        </FilterBoxWrapperStyled>
      </LineFormStyled>
    )
  };

  render() {
    const { messages, loadingMessages } = this.props;
    const { activity } = this.state;

    return (
      <ModalLineContentStyled alignLeft maxImage>
        <LineFormStyled borderBottom>
          <ModalLineTitleStyled
            padding={'0 10px'}
            hoverBorder
            active={activity === 'all'}
            onClick={() => this.handleChangeActivity('all')}
          >
            All
          </ModalLineTitleStyled>
          <ModalLineTitleStyled
            padding={'0 10px'}
            hoverBorder
            active={activity === 'logs'}
            onClick={() => this.handleChangeActivity('logs')}
          >
            Logs
          </ModalLineTitleStyled>
          <ModalLineTitleStyled
            padding={'0 10px'}
            hoverBorder
            active={activity === 'comments'}
            onClick={() => this.handleChangeActivity('comments')}
          >
            Comments
          </ModalLineTitleStyled>
        </LineFormStyled>
        <CommentBox />
        {
          loadingMessages ?
            <ElementHeaderStyled loading>
              <i className="fa fa-circle-o-notch fa-spin" />
            </ElementHeaderStyled>
          :
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
  loadAllMessagesOnIssue: PropTypes.func.isRequired,
  editMessage: PropTypes.func.isRequired,
  issue: PropTypes.object,
  loadingMessages: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  messages: state.message.messagesOnIssue,
  loadingMessages: state.message.isLoading,
  user: state.layout.user,
  issue: state.issue.issue
});

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  createMessage: createMessage,
  loadAllMessagesOnIssue: loadAllMessagesOnIssue,
  editMessage: editMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Message);
