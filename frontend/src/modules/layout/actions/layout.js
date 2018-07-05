import {
  LOAD_CURRENT_USER,
  REQUEST_LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  UPDATE_CURRENT_USER_ROLE,
  OPEN_MODAL,
  CLOSE_MODAL,
  LOAD_PROJECT_DETAILS,
  LOAD_PROJECT_DETAILS_REQUEST,
  LOAD_PROJECT_DETAILS_SUCCESS,
  LOAD_PROJECT_DETAILS_FAILURE,
  SELECT_PROJECT,
  RESET_PROJECT
} from './types';

const loadCurrentUser = goToLoginPage => ({
  type: LOAD_CURRENT_USER,
  goToLoginPage
});

const updateCurrentUserRole = (role) => ({
  type: UPDATE_CURRENT_USER_ROLE,
  role
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

const loadProjectDetails = (projectId, selectProject) => {
  return {
    type: LOAD_PROJECT_DETAILS,
    projectId,
    selectProject
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

const selectProject = (project) => {
  return {
    type: SELECT_PROJECT,
    project
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
  updateCurrentUserRole,
  openModal,
  closeModal,
  loadProjectDetails,
  loadProjectDetailsRequest,
  loadProjectDetailsSuccess,
  loadProjectDetailsFailure,
  selectProject,
  resetProject
}
