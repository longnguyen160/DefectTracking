import {
  LOAD_ALL_USERS,
  LOAD_ALL_USERS_REQUEST,
  LOAD_ALL_USERS_SUCCESS,
  LOAD_ALL_USERS_FAILURE,
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
  REMOVE_USER_REQUEST,
  RESET_USERS
} from './types';

const loadAllUsers = (input, projectId) => {
  return {
    type: LOAD_ALL_USERS,
    input,
    projectId
  }
};

const loadAllUsersRequest = () => {
  return {
    type: LOAD_ALL_USERS_REQUEST
  }
};

const loadAllUsersSuccess = (users) => {
  return {
    type: LOAD_ALL_USERS_SUCCESS,
    users
  }
};

const loadAllUsersFailure = (error) => {
  return {
    type: LOAD_ALL_USERS_FAILURE,
    error
  }
};

const removeUser = (projectId, userId) => {
  return {
    type: REMOVE_USER,
    projectId,
    userId
  }
};

const removeUserRequest = () => {
  return {
    type: REMOVE_USER_REQUEST
  }
};

const removeUserSuccess = () => {
  return {
    type: REMOVE_USER_SUCCESS
  }
};

const removeUserFailure = () => {
  return {
    type: REMOVE_USER_FAILURE
  }
};

const resetUsers = () => {
  return {
    type: RESET_USERS
  }
};

export {
  loadAllUsers,
  loadAllUsersRequest,
  loadAllUsersSuccess,
  loadAllUsersFailure,
  removeUser,
  removeUserRequest,
  removeUserSuccess,
  removeUserFailure,
  resetUsers
}
