import {
  UPDATE_BACKLOG_REQUEST,
  UPDATE_BACKLOG_SUCCESS,
  UPDATE_BACKLOG_FAILURE
} from '../actions/types';

const initialState = {
  isLoading: false,
  error: null
};

export default function backlog(state = initialState, action) {
  switch (action.type) {

    case UPDATE_BACKLOG_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case UPDATE_BACKLOG_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case UPDATE_BACKLOG_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    default:
      return state;
  }
}
