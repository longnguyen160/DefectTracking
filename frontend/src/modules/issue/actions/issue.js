import {
  CREATE_ISSUE,
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_FAILURE,
  LOAD_ALL_ISSUES,
  LOAD_ALL_ISSUES_SUCCESS,
  LOAD_ALL_ISSUES_FAILURE,
  LOAD_ALL_ISSUES_SHORTCUT,
  LOAD_ALL_ISSUES_SHORTCUT_REQUEST,
  LOAD_ALL_ISSUES_SHORTCUT_SUCCESS,
  LOAD_ALL_ISSUES_SHORTCUT_FAILURE,
  LOAD_ISSUE_DETAILS,
  LOAD_ISSUE_DETAILS_REQUEST,
  LOAD_ISSUE_DETAILS_SUCCESS,
  LOAD_ISSUE_DETAILS_FAILURE,
  RESET_ISSUE_DETAILS
} from './types';

const createIssue = (issue, closeModal) => {
  return {
    type: CREATE_ISSUE,
    issue,
    closeModal
  }
};

const createIssueRequest = () => {
  return {
    type: CREATE_ISSUE_REQUEST
  }
};

const createIssueSuccess = () => {
  return {
    type: CREATE_ISSUE_SUCCESS
  }
};

const createIssueFailure = (error) => {
  return {
    type: CREATE_ISSUE_FAILURE,
    error
  }
};

const loadAllIssues = () => {
  return {
    type: LOAD_ALL_ISSUES
  }
};

const loadAllIssuesSuccess = (data) => {
  return {
    type: LOAD_ALL_ISSUES_SUCCESS,
    data
  }
};

const loadAllIssuesFailure = (error) => {
  return {
    type: LOAD_ALL_ISSUES_FAILURE,
    error
  }
};

const loadAllIssuesShortcut = (userId) => {
  return {
    type: LOAD_ALL_ISSUES_SHORTCUT,
    userId
  }
};

const loadAllIssuesShortcutRequest = () => {
  return {
    type: LOAD_ALL_ISSUES_SHORTCUT_REQUEST
  }
};

const loadAllIssuesShortcutSuccess = (data) => {
  return {
    type: LOAD_ALL_ISSUES_SHORTCUT_SUCCESS,
    data
  }
};

const loadAllIssuesShortcutFailure = (error) => {
  return {
    type: LOAD_ALL_ISSUES_SHORTCUT_FAILURE,
    error
  }
};

const loadIssueDetails = (issueId) => {
  return {
    type: LOAD_ISSUE_DETAILS,
    issueId
  }
};

const loadIssueDetailsRequest = () => {
  return {
    type: LOAD_ISSUE_DETAILS_REQUEST
  }
};

const loadIssueDetailsSuccess = (data) => {
  return {
    type: LOAD_ISSUE_DETAILS_SUCCESS,
    data
  }
};

const loadIssueDetailsFailure = (error) => {
  return {
    type: LOAD_ISSUE_DETAILS_FAILURE,
    error
  }
};

const resetIssueDetails = () => {
  return {
    type: RESET_ISSUE_DETAILS
  }
};

export {
  createIssue,
  createIssueRequest,
  createIssueSuccess,
  createIssueFailure,
  loadAllIssues,
  loadAllIssuesSuccess,
  loadAllIssuesFailure,
  loadAllIssuesShortcut,
  loadAllIssuesShortcutRequest,
  loadAllIssuesShortcutSuccess,
  loadAllIssuesShortcutFailure,
  loadIssueDetails,
  loadIssueDetailsRequest,
  loadIssueDetailsSuccess,
  loadIssueDetailsFailure,
  resetIssueDetails
}
