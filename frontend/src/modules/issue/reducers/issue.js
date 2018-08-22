import {
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_FAILURE,
  LOAD_ALL_ISSUES_REQUEST,
  LOAD_ALL_ISSUES_SUCCESS,
  LOAD_ALL_ISSUES_FAILURE,
  LOAD_ALL_ISSUES_SHORTCUT_REQUEST,
  LOAD_ALL_ISSUES_SHORTCUT_SUCCESS,
  LOAD_ALL_ISSUES_SHORTCUT_FAILURE,
  LOAD_ISSUE_DETAILS_REQUEST,
  LOAD_ISSUE_DETAILS_SUCCESS,
  LOAD_ISSUE_DETAILS_FAILURE,
  LOAD_ISSUE_SHORTCUT_REQUEST,
  LOAD_ISSUE_SHORTCUT_SUCCESS,
  LOAD_ISSUE_SHORTCUT_FAILURE,
  LOAD_ALL_ISSUES_BASED_ON_FILTER_REQUEST,
  LOAD_ALL_ISSUES_BASED_ON_FILTER_SUCCESS,
  LOAD_ALL_ISSUES_BASED_ON_FILTER_FAILURE,
  DELETE_ISSUE_REQUEST,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE_FAILURE,
  RESET_ISSUE_DETAILS,
  RESET_ISSUE_LIST
} from '../actions/types';

const initialState = {
  issues: [],
  issueForHomePage: null,
  issue: null,
  issueShortcut: null,
  loadingIssueDetails: true,
  pages: 0,
  isLoading: true,
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

    case LOAD_ALL_ISSUES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_ALL_ISSUES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        issues: action.data.issues,
        pages: action.data.pages,
        error: null
      });

    case LOAD_ALL_ISSUES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_ISSUES_SHORTCUT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ALL_ISSUES_SHORTCUT_SUCCESS:
      return Object.assign({}, state, {
        issueForHomePage: action.data,
        isLoading: false,
        error: null
      });

    case LOAD_ALL_ISSUES_SHORTCUT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_ISSUES_BASED_ON_FILTER_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ALL_ISSUES_BASED_ON_FILTER_SUCCESS:
      return Object.assign({}, state, {
        issues: action.data.issues,
        pages: action.data.pages,
        isLoading: false,
        error: null
      });

    case LOAD_ALL_ISSUES_BASED_ON_FILTER_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ISSUE_DETAILS_REQUEST:
      return Object.assign({}, state, {
        loadingIssueDetails: action.loading,
        error: null
      });

    case LOAD_ISSUE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        issue: action.data,
        loadingIssueDetails: false,
        error: null
      });

    case LOAD_ISSUE_DETAILS_FAILURE:
      return Object.assign({}, state, {
        loadingIssueDetails: false,
        error: action.error
      });

    case LOAD_ISSUE_SHORTCUT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ISSUE_SHORTCUT_SUCCESS:
      return Object.assign({}, state, {
        issueShortcut: action.data,
        isLoading: false,
        error: null
      });

    case LOAD_ISSUE_SHORTCUT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case DELETE_ISSUE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case DELETE_ISSUE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case DELETE_ISSUE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_ISSUE_DETAILS:
      return Object.assign({}, state, {
        issue: null
      });

    case RESET_ISSUE_LIST:
      return Object.assign({}, state, {
        issues: []
      });

    default:
      return state;
  }
}
