import { UPDATE_PROFILE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE } from './types';

const updateProfile = (profile, email) => {
  return {
    type: UPDATE_PROFILE,
    profile,
    email
  }
};

const updateProfileRequest = () => {
  return {
    type: UPDATE_PROFILE_REQUEST
  }
};

const updateProfileSuccess = () => {
  return {
    type: UPDATE_PROFILE,
  }
};

const updateProfileFailure = (error) => {
  return {
    type: UPDATE_PROFILE_FAILURE,
    error
  }
};

export {
  updateProfile,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure
}

