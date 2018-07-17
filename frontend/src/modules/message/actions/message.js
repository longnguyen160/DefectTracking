import {
  CREATE_MESSAGE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  LOAD_ALL_MESSAGES,
  LOAD_ALL_MESSAGES_REQUEST,
  LOAD_ALL_MESSAGES_SUCCESS,
  LOAD_ALL_MESSAGES_FAILURE,
  LOAD_ALL_MESSAGES_ON_ISSUES,
  LOAD_ALL_MESSAGES_ON_ISSUES_REQUEST,
  LOAD_ALL_MESSAGES_ON_ISSUES_SUCCESS,
  LOAD_ALL_MESSAGES_ON_ISSUES_FAILURE,
  EDIT_MESSAGE,
  EDIT_MESSAGE_REQUEST,
  EDIT_MESSAGE_SUCCESS,
  EDIT_MESSAGE_FAILURE,
  RESET_MESSAGE
} from './types';

const createMessage = (message, loading) => {
  return {
    type: CREATE_MESSAGE,
    message,
    loading
  }
};

const createMessageRequest = () => {
  return {
    type: CREATE_MESSAGE_REQUEST
  }
};

const createMessageSuccess = () => {
  return {
    type: CREATE_MESSAGE_SUCCESS
  }
};

const createMessageFailure = (error) => {
  return {
    type: CREATE_MESSAGE_FAILURE,
    error
  }
};

const loadAllMessages = () => {
  return {
    type: LOAD_ALL_MESSAGES,
  }
};

const loadAllMessagesRequest = () => {
  return {
    type: LOAD_ALL_MESSAGES_REQUEST
  }
};

const loadAllMessagesSuccess = (messages) => {
  return {
    type: LOAD_ALL_MESSAGES_SUCCESS,
    messages
  }
};

const loadAllMessagesFailure = (error) => {
  return {
    type: LOAD_ALL_MESSAGES_FAILURE,
    error
  }
};

const loadAllMessagesOnIssue = (issueId, messageType, loading) => {
  return {
    type: LOAD_ALL_MESSAGES_ON_ISSUES,
    issueId,
    messageType,
    loading
  }
};

const loadAllMessagesOnIssueRequest = (loading) => {
  return {
    type: LOAD_ALL_MESSAGES_ON_ISSUES_REQUEST,
    loading
  }
};

const loadAllMessagesOnIssueSuccess = (messages) => {
  return {
    type: LOAD_ALL_MESSAGES_ON_ISSUES_SUCCESS,
    messages
  }
};

const loadAllMessagesOnIssueFailure = (error) => {
  return {
    type: LOAD_ALL_MESSAGES_ON_ISSUES_FAILURE,
    error
  }
};

const editMessage = (message) => {
  return {
    type: EDIT_MESSAGE,
    message
  }
};

const editMessageRequest = () => {
  return {
    type: EDIT_MESSAGE_REQUEST
  }
};

const editMessageSuccess = () => {
  return {
    type: EDIT_MESSAGE_SUCCESS
  }
};

const editMessageFailure = (error) => {
  return {
    type: EDIT_MESSAGE_FAILURE,
    error
  }
};

const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  }
};

export {
  createMessage,
  createMessageRequest,
  createMessageSuccess,
  createMessageFailure,
  loadAllMessages,
  loadAllMessagesRequest,
  loadAllMessagesSuccess,
  loadAllMessagesFailure,
  loadAllMessagesOnIssue,
  loadAllMessagesOnIssueRequest,
  loadAllMessagesOnIssueSuccess,
  loadAllMessagesOnIssueFailure,
  editMessage,
  editMessageRequest,
  editMessageSuccess,
  editMessageFailure,
  resetMessage
}
