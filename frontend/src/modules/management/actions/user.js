import {
  BAN_USER,
  REQUEST_BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_FAILURE
} from './types';

const banUser = (user) => {
  return {
    type: BAN_USER,
    user
  }
};

const requestBanUser = () => {
  return {
    type: REQUEST_BAN_USER
  }
};

const banUserSuccess = () => {
  return {
    type: BAN_USER_SUCCESS
  }
};

const banUserFailure = (error) => {
  return {
    type: BAN_USER_FAILURE,
    error
  }
};

export {
  banUser,
  requestBanUser,
  banUserSuccess,
  banUserFailure
}
