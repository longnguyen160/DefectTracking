import {
  CREATE_PROJECT,
  REQUEST_CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  LOAD_ALL_PROJECTS,
  LOAD_ALL_PROJECTS_SUCCESS,
  LOAD_ALL_PROJECTS_FAILURE
} from './types';

const createProject = (project, closeModal) => {
  return {
    type: CREATE_PROJECT,
    project,
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

const loadAllProjects = (userId) => {
  return {
    type: LOAD_ALL_PROJECTS,
    userId
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

export {
  createProject,
  requestCreateProject,
  createProjectSuccess,
  createProjectFailure,
  loadAllProjects,
  loadAllProjectsSuccess,
  loadAllProjectsFailure
}
