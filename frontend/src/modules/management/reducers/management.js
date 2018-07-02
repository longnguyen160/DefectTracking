import {
  REQUEST_CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  LOAD_ALL_CATEGORIES_REQUEST,
  LOAD_ALL_CATEGORIES_SUCCESS,
  LOAD_ALL_CATEGORIES_FAILURE,
  REQUEST_BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_FAILURE
} from '../actions/types';

const initialState = {
  categories: [],
  isLoading: false,
  error: null
};

export default function management(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CREATE_CATEGORY:
      return Object.assign({}, state, {
        isLoading: true
      });

    case CREATE_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case CREATE_CATEGORY_FAILURE:
      return Object.assign({}, state, {
        isLoading: true,
        error: action.error
      });

    case LOAD_ALL_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_ALL_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        categories: action.categories,
        error: null
      });

    case LOAD_ALL_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        isLoading: true,
        error: action.error
      });

    case REQUEST_BAN_USER:
      return Object.assign({}, state, {
        isLoading: true
      });

    case BAN_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case BAN_USER_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    default:
      return state;
  }
}
