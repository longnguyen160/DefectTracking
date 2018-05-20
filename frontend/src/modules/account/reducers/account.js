import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';
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
        user: action.user
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true
      });

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}
