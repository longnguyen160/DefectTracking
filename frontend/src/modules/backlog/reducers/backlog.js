import {
  UPDATE_BACKLOG_REQUEST,
  UPDATE_BACKLOG_SUCCESS,
  UPDATE_BACKLOG_FAILURE,
  LOAD_ALL_ISSUES_FROM_BACKLOG_REQUEST,
  LOAD_ALL_ISSUES_FROM_BACKLOG_SUCCESS,
  LOAD_ALL_ISSUES_FROM_BACKLOG_FAILURE,
  RESET_ISSUE_LIST
} from '../actions/types';

const initialState = {
  issueList: [],
  isLoading: false,
  error: null
};

export default function backlog(state = initialState, action) {
  switch (action.type) {

    case UPDATE_BACKLOG_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case UPDATE_BACKLOG_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case UPDATE_BACKLOG_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_ISSUES_FROM_BACKLOG_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ALL_ISSUES_FROM_BACKLOG_SUCCESS:
      return Object.assign({}, state, {
        issueList: action.data,
        isLoading: false,
        error: null
      });

    case LOAD_ALL_ISSUES_FROM_BACKLOG_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_ISSUE_LIST:
      return Object.assign({}, state, {
        issueList: []
      });

    default:
      return state;
  }
}
