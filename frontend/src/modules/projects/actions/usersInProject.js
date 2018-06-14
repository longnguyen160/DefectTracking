import {
  ADD_USER_TO_PROJECT,
  ADD_USER_TO_PROJECT_REQUEST,
  ADD_USER_TO_PROJECT_SUCCESS,
  ADD_USER_TO_PROJECT_FAILURE,
  LOAD_ALL_USERS_IN_PROJECT,
  LOAD_ALL_USERS_IN_PROJECT_REQUEST,
  LOAD_ALL_USERS_IN_PROJECT_SUCCESS,
  LOAD_ALL_USERS_IN_PROJECT_FAILURE
} from './types';

const addUserToProject = (requestData, closeModal) => {
  return {
    type: ADD_USER_TO_PROJECT,
    requestData,
    closeModal
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

const loadAllUsersInProject = (projectId) => {
  return {
    type: LOAD_ALL_USERS_IN_PROJECT,
    projectId
  }
};

const loadAllUsersInProjectRequest = () => {
  return {
    type: LOAD_ALL_USERS_IN_PROJECT_REQUEST
  }
};

const loadAllUsersInProjectSuccess = (data) => {
  return {
    type: LOAD_ALL_USERS_IN_PROJECT_SUCCESS,
    data
  }
};

const loadAllUsersInProjectFailure = (error) => {
  return {
    type: LOAD_ALL_USERS_IN_PROJECT_FAILURE,
    error
  }
};

export {
  addUserToProject,
  addUserToProjectRequest,
  addUserToProjectSuccess,
  addUserToProjectFailure,
  loadAllUsersInProject,
  loadAllUsersInProjectRequest,
  loadAllUsersInProjectSuccess,
  loadAllUsersInProjectFailure
}
