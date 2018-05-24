import { LOAD_CURRENT_USER, REQUEST_LOAD_CURRENT_USER, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE} from './types';

const loadCurrentUser = () => {
  return {
    type: LOAD_CURRENT_USER
  }
};

const requestLoadCurrentUser = () => {
  return {
    type: REQUEST_LOAD_CURRENT_USER
  }
};

const loadCurrentUserSuccess = (data) => {
  return {
    type: LOAD_CURRENT_USER_SUCCESS,
    data
  }
};

const loadCurrentUserFailure = () => {
  return {
    type: LOAD_CURRENT_USER_FAILURE
  }
};

export {
  loadCurrentUser,
  requestLoadCurrentUser,
  loadCurrentUserSuccess,
  loadCurrentUserFailure
}
