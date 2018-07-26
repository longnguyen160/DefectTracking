import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  LOAD_ALL_MESSAGES_REQUEST,
  LOAD_ALL_MESSAGES_SUCCESS,
  LOAD_ALL_MESSAGES_FAILURE,
  LOAD_ALL_MESSAGES_ON_ISSUES_REQUEST,
  LOAD_ALL_MESSAGES_ON_ISSUES_SUCCESS,
  LOAD_ALL_MESSAGES_ON_ISSUES_FAILURE,
  RESET_MESSAGE
} from '../actions/types';

const initialState = {
  messagesOnIssue: [],
  messages: [],
  isLoading: true,
  error: null
};

export default function message(state = initialState, action) {
  switch (action.type) {

    case CREATE_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.loading,
        error: null
      });

    case CREATE_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case CREATE_MESSAGE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_MESSAGES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ALL_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        messages: action.messages
      });

    case LOAD_ALL_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_MESSAGES_ON_ISSUES_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.loading,
        error: null
      });

    case LOAD_ALL_MESSAGES_ON_ISSUES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        messagesOnIssue: action.messages
      });

    case LOAD_ALL_MESSAGES_ON_ISSUES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_MESSAGE:
      return Object.assign({}, state, {
        messagesOnIssue: []
      });

    default:
      return state;
  }
}
