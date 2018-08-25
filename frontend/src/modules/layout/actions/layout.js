import {
  LOAD_ALL_CATEGORIES_IN_PROJECT,
  LOAD_ALL_CATEGORIES_IN_PROJECT_REQUEST,
  LOAD_ALL_CATEGORIES_IN_PROJECT_SUCCESS,
  LOAD_ALL_CATEGORIES_IN_PROJECT_FAILURE,
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
  LOAD_NOTIFICATION_COUNT,
  LOAD_NOTIFICATION_COUNT_REQUEST,
  LOAD_NOTIFICATION_COUNT_SUCCESS,
  LOAD_NOTIFICATION_COUNT_FAILURE,
  SELECT_PROJECT,
  RESET_PROJECT,
  RESET_SELECTED_PROJECT,
  RESET_ALL_CATEGORIES,
  RESET_NOTIFICATION_COUNT,
  RESET_USER
} from './types';

//LOAD ALL CATEGORIES IN PROJECT
const loadAllCategoriesInProject = (projectId) => ({
  type: LOAD_ALL_CATEGORIES_IN_PROJECT,
  projectId
});

const loadAllCategoriesInProjectRequest = () => ({
  type: LOAD_ALL_CATEGORIES_IN_PROJECT_REQUEST
}) ;

const loadAllCategoriesInProjectSuccess = (categories) => ({
  type: LOAD_ALL_CATEGORIES_IN_PROJECT_SUCCESS,
  categories
});

const loadAllCategoriesInProjectFailure = (error) => ({
  type: LOAD_ALL_CATEGORIES_IN_PROJECT_FAILURE,
  error
});

//LOAD CURRENT USER
const loadCurrentUser = goToLoginPage => ({
  type: LOAD_CURRENT_USER,
  goToLoginPage
});

const updateCurrentUserRole = (newRole, oldRole) => ({
  type: UPDATE_CURRENT_USER_ROLE,
  newRole,
  oldRole
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

const selectProject = (project) => ({
  type: SELECT_PROJECT,
  project
});

const loadNotificationCount = () => ({
  type: LOAD_NOTIFICATION_COUNT
});

const loadNotificationCountRequest = () => ({
  type: LOAD_NOTIFICATION_COUNT_REQUEST
});

const loadNotificationCountSuccess = (count) => ({
  type: LOAD_NOTIFICATION_COUNT_SUCCESS,
  count
});

const loadNotificationCountFailure = (error) => ({
  type: LOAD_NOTIFICATION_COUNT_FAILURE,
  error
});

const resetNotificationCount = () => ({
  type: RESET_NOTIFICATION_COUNT
});

const resetSelectedProject = () => ({
  type: RESET_SELECTED_PROJECT
});

const resetProject = () => ({
  type: RESET_PROJECT
});

const resetAllCategories = () => ({
  type: RESET_ALL_CATEGORIES
});

const resetUser = () => ({
  type: RESET_USER
});

export {
  loadAllCategoriesInProject,
  loadAllCategoriesInProjectRequest,
  loadAllCategoriesInProjectSuccess,
  loadAllCategoriesInProjectFailure,
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
  loadNotificationCount,
  loadNotificationCountRequest,
  loadNotificationCountSuccess,
  loadNotificationCountFailure,
  resetProject,
  resetSelectedProject,
  resetAllCategories,
  resetUser,
  resetNotificationCount
}
