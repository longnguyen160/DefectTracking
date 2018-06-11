import {
  LOAD_CURRENT_USER,
  REQUEST_LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SELECT_PROJECT,
  RESET_PROJECT
} from './types';

const loadCurrentUser = goToLoginPage => ({
  type: LOAD_CURRENT_USER,
  goToLoginPage
});

const requestLoadCurrentUser = () => ({
  type: REQUEST_LOAD_CURRENT_USER
});

const loadCurrentUserSuccess = data => ({
  type: LOAD_CURRENT_USER_SUCCESS,
  data
});

const loadCurrentUserFailure = () => ({
  type: LOAD_CURRENT_USER_FAILURE
});

const openModal = modalType => ({
  type: OPEN_MODAL,
  modalType
});

const closeModal = () => ({
  type: CLOSE_MODAL
});

const selectProject = project => ({
  type: SELECT_PROJECT,
  project
});

const resetProject = () => ({
  type: RESET_PROJECT
});

export {
  loadCurrentUser,
  requestLoadCurrentUser,
  loadCurrentUserSuccess,
  loadCurrentUserFailure,
  openModal,
  closeModal,
  selectProject,
  resetProject
}
