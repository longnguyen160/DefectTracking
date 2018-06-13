import { ADD_USER_TO_PROJECT, ADD_USER_TO_PROJECT_REQUEST, ADD_USER_TO_PROJECT_SUCCESS, ADD_USER_TO_PROJECT_FAILURE } from './types';

const addUserToProject = (requestData) => {
  return {
    type: ADD_USER_TO_PROJECT,
    requestData
  }
};

const addUserToProjectRequest = () => {
  return {
    type: ADD_USER_TO_PROJECT_REQUEST
  }
};

const addUserToProjectSuccess = () => {
  return {
    type: ADD_USER_TO_PROJECT_SUCCESS
  }
};

const addUserToProjectFailure = (error) => {
  return {
    type: ADD_USER_TO_PROJECT_FAILURE,
    error
  }
};

export {
  addUserToProject,
  addUserToProjectRequest,
  addUserToProjectSuccess,
  addUserToProjectFailure
}
