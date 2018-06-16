import {
  REQUEST_CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  LOAD_ALL_PROJECTS_SUCCESS,
  LOAD_ALL_PROJECTS_FAILURE
} from '../actions/types';

const initialState = {
  projects: [],
  isLoading: false,
  error: null,
};

export default function project(state = initialState, action) {
  switch (action.type) {

    
    case REQUEST_CREATE_PROJECT:
      return Object.assign({}, state, {
        isLoading: true
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

    default:
      return state;
  }
}
