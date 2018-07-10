import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  REQUEST_LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_ALL_USERS_SUCCESS,
  LOAD_ALL_USERS_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  REMOVE_USER_REQUEST,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
  RESET_USERS
} from '../actions/types';
import { getUserIdFromToken, checkAuthentication } from '../../../utils/ultis';

const initialState = {
  users: [],
  isFetching: false,
  isAuthenticated: checkAuthentication(),
  userId: getUserIdFromToken(),
  error: null
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        error: null
      });

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case SIGN_UP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });

    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null
      });

    case SIGN_UP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case REQUEST_LOG_OUT:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });

    case LOG_OUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        error: null
      });

    case LOG_OUT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case LOAD_ALL_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.users,
        error: null
      });

    case LOAD_ALL_USERS_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    case UPDATE_PROFILE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });

    case UPDATE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null
      });

    case UPDATE_PROFILE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case REMOVE_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });

    case REMOVE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null
      });

    case REMOVE_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case RESET_USERS:
      return Object.assign({}, state, {
        users: []
      });

    default:
      return state;
  }
}
