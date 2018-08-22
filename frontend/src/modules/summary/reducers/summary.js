import {
  GET_ISSUE_SUMMARY_REQUEST,
  GET_ISSUE_SUMMARY_SUCCESS,
  GET_ISSUE_SUMMARY_FAILURE,
  GET_ISSUE_SUMMARY_DETAILS_REQUEST,
  GET_ISSUE_SUMMARY_DETAILS_SUCCESS,
  GET_ISSUE_SUMMARY_DETAILS_FAILURE,
  RESET_SUMMARY, RESET_SUMMARY_DETAILS
} from '../actions/types';

const initialState = {
  isLoading: false,
  summaryData: [],
  summaryDetails: null,
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

    case GET_ISSUE_SUMMARY_DETAILS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case GET_ISSUE_SUMMARY_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        summaryDetails: action.summaryDetails
      });

    case GET_ISSUE_SUMMARY_DETAILS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_SUMMARY:
      return Object.assign({}, state, {
        summaryData: []
      });

    case RESET_SUMMARY_DETAILS:
      return Object.assign({}, state, {
        summaryDetails: null
      });

    default:
      return state;
  }
}
