import {
  GET_FILTER_REQUEST,
  GET_FILTER_SUCCESS,
  GET_FILTER_FAILURE,
  UPDATE_BACKLOG_REQUEST,
  UPDATE_BACKLOG_SUCCESS,
  UPDATE_BACKLOG_FAILURE,
  LOAD_ALL_ISSUES_FROM_BACKLOG_REQUEST,
  LOAD_ALL_ISSUES_FROM_BACKLOG_SUCCESS,
  LOAD_ALL_ISSUES_FROM_BACKLOG_FAILURE,
  RESET_ISSUE_LIST
} from '../actions/types';

const initialState = {
  filter: null,
  issueList: [],
  isLoading: false,
  error: null
};

export default function backlog(state = initialState, action) {
  switch (action.type) {
    //get filter by userId
    case GET_FILTER_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case GET_FILTER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        filter: action.filter,
        error: null
      });

    case GET_FILTER_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    //update backlog
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
      //load issues
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
