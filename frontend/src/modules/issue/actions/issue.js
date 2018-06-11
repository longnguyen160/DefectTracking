import {
  CREATE_ISSUE,
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_FAILURE,
  LOAD_ALL_ISSUES,
  LOAD_ALL_ISSUES_SUCCESS,
  LOAD_ALL_ISSUES_FAILURE
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

export {
  createIssue,
  createIssueRequest,
  createIssueSuccess,
  createIssueFailure,
  loadAllIssues,
  loadAllIssuesSuccess,
  loadAllIssuesFailure
}
