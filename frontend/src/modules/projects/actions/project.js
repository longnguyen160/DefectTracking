import {
  CREATE_PROJECT,
  REQUEST_CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  LOAD_ALL_PROJECTS,
  LOAD_ALL_PROJECTS_SUCCESS,
  LOAD_ALL_PROJECTS_FAILURE,
  UPDATE_PROJECT,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  SELECT_PROJECT_TYPE,
  RESET_PROJECT_TYPE
} from './types';

const createProject = (projectCategory, closeModal) => {
  return {
    type: CREATE_PROJECT,
    projectCategory,
    closeModal
  }
};

const requestCreateProject = () => {
  return {
    type: REQUEST_CREATE_PROJECT
  }
};

const createProjectSuccess = () => {
  return {
    type: CREATE_PROJECT_SUCCESS
  }
};

const createProjectFailure = (error) => {
  return {
    type: CREATE_PROJECT_FAILURE,
    error
  }
};

const loadAllProjects = () => {
  return {
    type: LOAD_ALL_PROJECTS
  }
};

const loadAllProjectsSuccess = (projects) => {
  return {
    type: LOAD_ALL_PROJECTS_SUCCESS,
    projects
  }
};

const loadAllProjectsFailure = (error) => {
  return {
    type: LOAD_ALL_PROJECTS_FAILURE,
    error
  }
};

const updateProject = (projectRequest, closeModal) => {
  return {
    type: UPDATE_PROJECT,
    projectRequest,
    closeModal
  }
};

const updateProjectRequest = () => {
  return {
    type: UPDATE_PROJECT_REQUEST
  }
};

const updateProjectSuccess = () => {
  return {
    type: UPDATE_PROJECT_SUCCESS
  }
};

const updateProjectFailure = (error) => {
  return {
    type: UPDATE_PROJECT_FAILURE,
    error
  }
};

const selectProjectType = (projectType) => {
  return {
    type: SELECT_PROJECT_TYPE,
    projectType
  }
};

const resetProjectType = () => {
  return {
    type: RESET_PROJECT_TYPE
  }
};

export {
  createProject,
  requestCreateProject,
  createProjectSuccess,
  createProjectFailure,
  loadAllProjects,
  loadAllProjectsSuccess,
  loadAllProjectsFailure,
  updateProject,
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,
  selectProjectType,
  resetProjectType
}
