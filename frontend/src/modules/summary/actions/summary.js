import {
  GET_ISSUE_SUMMARY,
  GET_ISSUE_SUMMARY_REQUEST,
  GET_ISSUE_SUMMARY_SUCCESS,
  GET_ISSUE_SUMMARY_FAILURE,
  RESET_SUMMARY
} from './types';

const getIssueSummary = (summaryRequest) => ({
  type: GET_ISSUE_SUMMARY,
  summaryRequest
});

const getIssueSummaryRequest = () => ({
  type: GET_ISSUE_SUMMARY_REQUEST
});

const getIssueSummarySuccess = (summary) => ({
  type: GET_ISSUE_SUMMARY_SUCCESS,
  summary
});

const getIssueSummaryFailure = (error) => ({
  type: GET_ISSUE_SUMMARY_FAILURE,
  error
});

const resetSummary = () => ({
  type: RESET_SUMMARY
});

export {
  getIssueSummary,
  getIssueSummaryRequest,
  getIssueSummarySuccess,
  getIssueSummaryFailure,
  resetSummary
}
