import { SIGN_UP_USER, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './types';

const signUpUser = (user, goToLoginPage) => {
  return {
    type: SIGN_UP_USER,
    user,
    goToLoginPage
  }
};

const requestSignUp = (user) => {
  return {
    type: SIGN_UP_REQUEST,
    user
  }
};

const signUpSuccess = () => {
  return {
    type: SIGN_UP_SUCCESS
  }
};

const signUpError = (error) => {
  return {
    type: SIGN_UP_FAILURE,
    error
  }
};

export {
  signUpUser,
  requestSignUp,
  signUpSuccess,
  signUpError
}
