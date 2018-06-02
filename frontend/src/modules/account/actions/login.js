import { LOGIN_USER, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

const loginUser = (user, goToDashboard) => {
  return {
    type: LOGIN_USER,
    user,
    goToDashboard
  }
};

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
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
