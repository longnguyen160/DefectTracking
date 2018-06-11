import {
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_FAILURE,
  LOAD_ALL_ISSUES_SUCCESS,
  LOAD_ALL_ISSUES_FAILURE
} from '../actions/types';

const initialState = {
  issues: [],
  isLoading: false,
  error: null
};

export default function issue(state = initialState, action) {
  switch (action.type) {
    case CREATE_ISSUE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case CREATE_ISSUE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case CREATE_ISSUE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_ISSUES_SUCCESS:
      return Object.assign({}, state, {
        issues: action.data,
        error: null
      });

    case LOAD_ALL_ISSUES_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    default:
      return state;
  }
}
