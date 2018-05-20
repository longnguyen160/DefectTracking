import { LOGIN_USER, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

const loginUser = (user, goToDashboard) => {
  return {
    type: LOGIN_USER,
    user,
    goToDashboard
  }
};

const requestLogin = (user) => {
  return {
    type: LOGIN_REQUEST,
    user
  }
};

const loginSuccess = (accessToken) => {
  return {
    type: LOGIN_SUCCESS,
    accessToken
  }
};

const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  }
};

export {
  loginUser,
  requestLogin,
  loginSuccess,
  loginError
}
