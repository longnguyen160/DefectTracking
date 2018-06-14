import { LOAD_ALL_USERS, LOAD_ALL_USERS_SUCCESS, LOAD_ALL_USERS_FAILURE } from './types';

const loadAllUsers = (input, projectId) => {
  return {
    type: LOAD_ALL_USERS,
    input,
    projectId
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

export {
  loadAllUsers,
  loadAllUsersSuccess,
  loadAllUsersFailure
}
