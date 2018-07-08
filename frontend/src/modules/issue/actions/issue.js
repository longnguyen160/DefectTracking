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
  UPDATE_ISSUE,
  UPDATE_ISSUE_REQUEST,
  UPDATE_ISSUE_SUCCESS,
  UPDATE_ISSUE_FAILURE,
  LOAD_ISSUE_SHORTCUT,
  LOAD_ISSUE_SHORTCUT_REQUEST,
  LOAD_ISSUE_SHORTCUT_SUCCESS,
  LOAD_ISSUE_SHORTCUT_FAILURE,
  LOAD_ALL_ISSUES_BASED_ON_FILTER,
  LOAD_ALL_ISSUES_BASED_ON_FILTER_REQUEST,
  LOAD_ALL_ISSUES_BASED_ON_FILTER_SUCCESS,
  LOAD_ALL_ISSUES_BASED_ON_FILTER_FAILURE,
  RESET_ISSUE_DETAILS,
  RESET_ISSUE_LIST
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

const loadAllIssuesBasedOnFilter = (filter) => {
  return {
    type: LOAD_ALL_ISSUES_BASED_ON_FILTER,
    filter
  }
};

const loadAllIssuesBasedOnFilterRequest = () => {
  return {
    type: LOAD_ALL_ISSUES_BASED_ON_FILTER_REQUEST
  }
};

const loadAllIssuesBasedOnFilterSuccess = (data) => {
  return {
    type: LOAD_ALL_ISSUES_BASED_ON_FILTER_SUCCESS,
    data
  }
};

const loadAllIssuesBasedOnFilterFailure = (error) => {
  return {
    type: LOAD_ALL_ISSUES_BASED_ON_FILTER_FAILURE,
    error
  }
};

const loadIssueShortcut = (issueId) => {
  return {
    type: LOAD_ISSUE_SHORTCUT,
    issueId
  }
};

const loadIssueShortcutRequest = () => {
  return {
    type: LOAD_ISSUE_SHORTCUT_REQUEST
  }
};

const loadIssueShortcutSuccess = (data) => {
  return {
    type: LOAD_ISSUE_SHORTCUT_SUCCESS,
    data
  }
};

const loadIssueShortcutFailure = (error) => {
  return {
    type: LOAD_ISSUE_SHORTCUT_FAILURE,
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

const updateIssue = (issueData) => {
  return {
    type: UPDATE_ISSUE,
    issueData
  };
};

const updateIssueRequest = () => {
  return {
    type: UPDATE_ISSUE_REQUEST
  };
};

const updateIssueSuccess = () => {
  return {
    type: UPDATE_ISSUE_SUCCESS,
  };
};

const updateIssueFailure = (error) => {
  return {
    type: UPDATE_ISSUE_FAILURE,
    error
  };
};

const resetIssueDetails = () => {
  return {
    type: RESET_ISSUE_DETAILS
  }
};

const resetIssueList = () => {
  return {
    type: RESET_ISSUE_LIST
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
  updateIssue,
  updateIssueRequest,
  updateIssueSuccess,
  updateIssueFailure,
  loadIssueShortcut,
  loadIssueShortcutRequest,
  loadIssueShortcutSuccess,
  loadIssueShortcutFailure,
  loadAllIssuesBasedOnFilter,
  loadAllIssuesBasedOnFilterRequest,
  loadAllIssuesBasedOnFilterSuccess,
  loadAllIssuesBasedOnFilterFailure,
  resetIssueDetails,
  resetIssueList
}
