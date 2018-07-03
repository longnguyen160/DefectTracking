import {
  REQUEST_LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  UPDATE_CURRENT_USER_ROLE,
  OPEN_MODAL,
  CLOSE_MODAL,
  LOAD_PROJECT_DETAILS_REQUEST,
  LOAD_PROJECT_DETAILS_SUCCESS,
  LOAD_PROJECT_DETAILS_FAILURE,
  RESET_PROJECT
} from '../actions/types';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  modalIsOpen: false,
  selectedProject: null,
  modalType: ''
};

export default function account(state = initialState, action) {
  switch (action.type) {
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
          role: state.user.role.concat(action.role)
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
        selectedProject: action.data,
        error: null
      });

    case LOAD_PROJECT_DETAILS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_PROJECT:
      return Object.assign({}, state, {
        selectedProject: null
      });

    default:
      return state;
  }
}
