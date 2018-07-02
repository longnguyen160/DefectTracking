import {
  CREATE_MESSAGE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  LOAD_ALL_MESSAGES,
  LOAD_ALL_MESSAGES_REQUEST,
  LOAD_ALL_MESSAGES_SUCCESS,
  LOAD_ALL_MESSAGES_FAILURE,
  EDIT_MESSAGE,
  EDIT_MESSAGE_REQUEST,
  EDIT_MESSAGE_SUCCESS,
  EDIT_MESSAGE_FAILURE
} from './types';

const createMessage = (message) => {
  return {
    type: CREATE_MESSAGE,
    message
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

const loadAllMessages = (issueId, messageType) => {
  return {
    type: LOAD_ALL_MESSAGES,
    issueId,
    messageType
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
  return{
    type: EDIT_MESSAGE_FAILURE,
    error
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
  editMessage,
  editMessageRequest,
  editMessageSuccess,
  editMessageFailure
}
