import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../actions/types';
import { getUserIdFromToken, checkAuthentication } from '../../../utils/ultis';

const initialState = {
  isFetching: false,
  isAuthenticated: checkAuthentication(),
  user: {
    _id: getUserIdFromToken(),
    username: '',
    email: '',
    profile: null
  },
  error: null
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        user: action.user
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

    default:
      return state;
  }
}
