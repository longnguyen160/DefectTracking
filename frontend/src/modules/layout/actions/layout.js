import {
  LOAD_CURRENT_USER,
  REQUEST_LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SELECT_PROJECT,
  LOAD_PROJECT_DETAILS,
  LOAD_PROJECT_DETAILS_REQUEST,
  LOAD_PROJECT_DETAILS_SUCCESS,
  LOAD_PROJECT_DETAILS_FAILURE,
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

const loadProjectDetails = (projectId) => {
  return {
    type: LOAD_PROJECT_DETAILS,
    projectId
  }
};

const loadProjectDetailsRequest = () => {
  return {
    type: LOAD_PROJECT_DETAILS_REQUEST
  }
};

const loadProjectDetailsSuccess = (data) => {
  return {
    type: LOAD_PROJECT_DETAILS_SUCCESS,
    data
  }
};

const loadProjectDetailsFailure = (error) => {
  return {
    type: LOAD_PROJECT_DETAILS_FAILURE,
    error
  }
};

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
  loadProjectDetails,
  loadProjectDetailsRequest,
  loadProjectDetailsSuccess,
  loadProjectDetailsFailure,
  resetProject
}
