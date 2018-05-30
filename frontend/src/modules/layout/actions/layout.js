import {
  LOAD_CURRENT_USER,
  REQUEST_LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  OPEN_MODAL,
  CLOSE_MODAL
} from './types';

const loadCurrentUser = (goToLoginPage) => {
  return {
    type: LOAD_CURRENT_USER,
    goToLoginPage
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

const openModal = (modalType) => {
  return {
    type: OPEN_MODAL,
    modalType
  }
};

const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
};

export {
  loadCurrentUser,
  requestLoadCurrentUser,
  loadCurrentUserSuccess,
  loadCurrentUserFailure,
  openModal,
  closeModal
}
