import {
  GET_ISSUE_SUMMARY_REQUEST,
  GET_ISSUE_SUMMARY_SUCCESS,
  GET_ISSUE_SUMMARY_FAILURE,
  RESET_SUMMARY
} from '../actions/types';

const initialState = {
  isLoading: false,
  summaryData: [],
  error: null
};

export default function summary(state = initialState, action) {
  switch (action.type) {
    case GET_ISSUE_SUMMARY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case GET_ISSUE_SUMMARY_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        summaryData: action.summary
      });

    case GET_ISSUE_SUMMARY_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_SUMMARY:
      return Object.assign({}, state, {
        summaryData: []
      });

    default:
      return state;
  }
}
