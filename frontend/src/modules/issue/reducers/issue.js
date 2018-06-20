import {
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_FAILURE,
  LOAD_ALL_ISSUES_SUCCESS,
  LOAD_ALL_ISSUES_FAILURE,
  LOAD_ALL_ISSUES_SHORTCUT_REQUEST,
  LOAD_ALL_ISSUES_SHORTCUT_SUCCESS,
  LOAD_ALL_ISSUES_SHORTCUT_FAILURE,
  LOAD_ISSUE_DETAILS_REQUEST,
  LOAD_ISSUE_DETAILS_SUCCESS,
  LOAD_ISSUE_DETAILS_FAILURE,
  RESET_ISSUE_DETAILS
} from '../actions/types';

const initialState = {
  issues: [],
  issue: null,
  isLoading: false,
  error: null
};

export default function issue(state = initialState, action) {
  switch (action.type) {
    case CREATE_ISSUE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case CREATE_ISSUE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case CREATE_ISSUE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_ISSUES_SUCCESS:
      return Object.assign({}, state, {
        issues: action.data,
        error: null
      });

    case LOAD_ALL_ISSUES_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    case LOAD_ALL_ISSUES_SHORTCUT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ALL_ISSUES_SHORTCUT_SUCCESS:
      return Object.assign({}, state, {
        issues: action.data,
        isLoading: false,
        error: null
      });

    case LOAD_ALL_ISSUES_SHORTCUT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ISSUE_DETAILS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ISSUE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        issue: action.data,
        isLoading: false,
        error: null
      });

    case LOAD_ISSUE_DETAILS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_ISSUE_DETAILS:
      return Object.assign({}, state, {
        issue: null
      });

    default:
      return state;
  }
}
