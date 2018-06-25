import {
  UPDATE_BACKLOG,
  UPDATE_BACKLOG_REQUEST,
  UPDATE_BACKLOG_SUCCESS,
  UPDATE_BACKLOG_FAILURE
} from './types';

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

export {
  updateBacklog,
  updateBacklogRequest,
  updateBacklogSuccess,
  updateBacklogFailure
}
