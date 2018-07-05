import {
  LOAD_ALL_CATEGORIES_IN_PROJECT_REQUEST,
  LOAD_ALL_CATEGORIES_IN_PROJECT_SUCCESS,
  LOAD_ALL_CATEGORIES_IN_PROJECT_FAILURE,
  REQUEST_LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  UPDATE_CURRENT_USER_ROLE,
  OPEN_MODAL,
  CLOSE_MODAL,
  LOAD_PROJECT_DETAILS_REQUEST,
  LOAD_PROJECT_DETAILS_SUCCESS,
  LOAD_PROJECT_DETAILS_FAILURE,
  SELECT_PROJECT,
  RESET_PROJECT,
  RESET_SELECTED_PROJECT
} from '../actions/types';
import { loadAllCategoriesInProjectRequest } from '../actions/layout';

const initialState = {
  categories:[],
  user: null,
  isLoading: false,
  error: null,
  modalIsOpen: false,
  selectedProject: null,
  project: null,
  modalType: ''
};

export default function account(state = initialState, action) {
  switch (action.type) {
    //load all categories in project
    case LOAD_ALL_CATEGORIES_IN_PROJECT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });
    
    case LOAD_ALL_CATEGORIES_IN_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        categories: action.categories,
        isLoading: false,
        error: null
      });

    case LOAD_ALL_CATEGORIES_IN_PROJECT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    //load current user 
    case REQUEST_LOAD_CURRENT_USER:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_CURRENT_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.data,
        isLoading: false,
        error: null
      });

    case LOAD_CURRENT_USER_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case UPDATE_CURRENT_USER_ROLE:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          roles: state.user.roles.concat(action.role)
        }
      });

    case OPEN_MODAL:
      return Object.assign({}, state, {
        modalIsOpen: true,
        modalType: action.modalType
      });

    case CLOSE_MODAL:
      return Object.assign({}, state, {
        modalIsOpen: false,
        modalType: ''
      });

    case LOAD_PROJECT_DETAILS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_PROJECT_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        project: action.data,
        error: null
      });

    case LOAD_PROJECT_DETAILS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case SELECT_PROJECT:
      return Object.assign({}, state, {
        selectedProject: action.project,
      });

    case RESET_PROJECT:
      return Object.assign({}, state, {
        project: null
      });

    case RESET_SELECTED_PROJECT:
      return Object.assign({}, state, {
        selectedProject: null
      });

    default:
      return state;
  }
}
