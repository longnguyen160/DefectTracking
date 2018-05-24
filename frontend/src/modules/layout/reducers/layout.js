import { REQUEST_LOAD_CURRENT_USER, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE } from '../actions/types';

const initialState = {
  user: null,
  isLoading: false,
  error: null
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

    default:
      return state;
  }
}
