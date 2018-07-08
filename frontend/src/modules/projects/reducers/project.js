import {
  REQUEST_CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  LOAD_ALL_PROJECTS_SUCCESS,
  LOAD_ALL_PROJECTS_FAILURE,
  ADD_USER_TO_PROJECT_REQUEST,
  ADD_USER_TO_PROJECT_SUCCESS,
  ADD_USER_TO_PROJECT_FAILURE,
  LOAD_ALL_USERS_IN_PROJECT_REQUEST,
  LOAD_ALL_USERS_IN_PROJECT_SUCCESS,
  LOAD_ALL_USERS_IN_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE
} from '../actions/types';

const initialState = {
  projects: [],
  usersInProject: [],
  isLoading: false,
  error: null,
};

export default function project(state = initialState, action) {
  switch (action.type) {

    case REQUEST_CREATE_PROJECT:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case CREATE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case CREATE_PROJECT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        projects: action.projects,
        error: null
      });

    case LOAD_ALL_PROJECTS_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    case ADD_USER_TO_PROJECT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case ADD_USER_TO_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case ADD_USER_TO_PROJECT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_USERS_IN_PROJECT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ALL_USERS_IN_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        usersInProject: action.data
      });

    case LOAD_ALL_USERS_IN_PROJECT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case UPDATE_PROJECT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case UPDATE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case UPDATE_PROJECT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    default:
      return state;
  }
}
