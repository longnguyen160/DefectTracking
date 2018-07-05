import {
  GET_FILTER,  
  GET_FILTER_REQUEST,
  GET_FILTER_SUCCESS,
  GET_FILTER_FAILURE,
  UPDATE_BACKLOG,
  UPDATE_BACKLOG_REQUEST,
  UPDATE_BACKLOG_SUCCESS,
  UPDATE_BACKLOG_FAILURE,
  LOAD_ALL_ISSUES_FROM_BACKLOG,
  LOAD_ALL_ISSUES_FROM_BACKLOG_REQUEST,
  LOAD_ALL_ISSUES_FROM_BACKLOG_SUCCESS,
  LOAD_ALL_ISSUES_FROM_BACKLOG_FAILURE,
  RESET_ISSUE_LIST
} from './types';
// GET FILTER 
const getFilter = (userId) => {
  return {
    types: GET_FILTER,
    userId
  }
};

const getFilterRequest = () => {
  return {
    types: GET_FILTER_REQUEST
  }
};

const getFilterSuccess = (filter) => {
  return {
    types: GET_FILTER_SUCCESS,
    filter
  }
};

const getFilterFailure = (error) => {
  return {
    types: GET_FILTER_FAILURE,
    error
  }
};

//update backlog
const updateBacklog = (projectId, backlog) => {
  return {
    type: UPDATE_BACKLOG,
    projectId,
    backlog
  }
};

const updateBacklogRequest = () => {
  return {
    type: UPDATE_BACKLOG_REQUEST
  }
};

const updateBacklogSuccess = () => {
  return {
    type: UPDATE_BACKLOG_SUCCESS,
  }
};

const updateBacklogFailure = (error) => {
  return {
    type: UPDATE_BACKLOG_FAILURE,
    error
  }
};

const loadAllIssuesFromBacklog = (issueList) => {
  return {
    type: LOAD_ALL_ISSUES_FROM_BACKLOG,
    issueList
  }
};

const loadAllIssuesFromBacklogRequest = () => {
  return {
    type: LOAD_ALL_ISSUES_FROM_BACKLOG_REQUEST
  }
};

const loadAllIssuesFromBacklogSuccess = (data) => {
  return {
    type: LOAD_ALL_ISSUES_FROM_BACKLOG_SUCCESS,
    data
  }
};

const loadAllIssuesFromBacklogFailure = (error) => {
  return {
    type: LOAD_ALL_ISSUES_FROM_BACKLOG_FAILURE,
    error
  }
};

const resetIssueList = () => {
  return {
    type: RESET_ISSUE_LIST
  }
};

export {
  getFilter,
  getFilterRequest,
  getFilterSuccess,
  getFilterFailure,
  updateBacklog,
  updateBacklogRequest,
  updateBacklogSuccess,
  updateBacklogFailure,
  loadAllIssuesFromBacklog,
  loadAllIssuesFromBacklogRequest,
  loadAllIssuesFromBacklogSuccess,
  loadAllIssuesFromBacklogFailure,
  resetIssueList
}
