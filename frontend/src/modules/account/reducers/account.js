import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  REQUEST_LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE
} from '../actions/types';
import { getUserIdFromToken, checkAuthentication } from '../../../utils/ultis';

const initialState = {
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

    default:
      return state;
  }
}
