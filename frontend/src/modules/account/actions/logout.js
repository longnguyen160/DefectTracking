import { LOG_OUT, REQUEST_LOG_OUT, LOG_OUT_SUCCESS, LOG_OUT_FAILURE } from './types';

const logOut = (goToLoginPage) => {
  return {
    type: LOG_OUT,
    goToLoginPage
  }
};

const requestLogOut = () => {
  return {
    type: REQUEST_LOG_OUT
  }
};

const logOutSuccess = () => {
  return {
    type: LOG_OUT_SUCCESS
  }
};

const logOutFailure = (error) => {
  return {
    type: LOG_OUT_FAILURE,
    error
  }
};

export {
  logOut,
  requestLogOut,
  logOutSuccess,
  logOutFailure
}
