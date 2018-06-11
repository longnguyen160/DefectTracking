import {
  REQUEST_LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SELECT_PROJECT,
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

    case SELECT_PROJECT:
      return Object.assign({}, state, {
        selectedProject: action.project
      });

    case RESET_PROJECT:
      return Object.assign({}, state, {
        selectedProject: null
      });

    default:
      return state;
  }
}
