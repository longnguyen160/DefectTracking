import {
  GET_ISSUE_SUMMARY,
  GET_ISSUE_SUMMARY_REQUEST,
  GET_ISSUE_SUMMARY_SUCCESS,
  GET_ISSUE_SUMMARY_FAILURE,
  GET_ISSUE_SUMMARY_DETAILS,
  GET_ISSUE_SUMMARY_DETAILS_REQUEST,
  GET_ISSUE_SUMMARY_DETAILS_SUCCESS,
  GET_ISSUE_SUMMARY_DETAILS_FAILURE,
  RESET_SUMMARY,
  RESET_SUMMARY_DETAILS
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

const getSummaryDetails = (userId, projectId) => ({
  type: GET_ISSUE_SUMMARY_DETAILS,
  userId,
  projectId
});

const getSummaryDetailsRequest = () => ({
  type: GET_ISSUE_SUMMARY_DETAILS_REQUEST
});

const getSummaryDetailsSuccess = (summaryDetails) => ({
  type: GET_ISSUE_SUMMARY_DETAILS_SUCCESS,
  summaryDetails
});

const getSummaryDetailsFailure = (error) => ({
  type: GET_ISSUE_SUMMARY_DETAILS_FAILURE,
  error
});

const resetSummary = () => ({
  type: RESET_SUMMARY
});

const resetSummaryDetails = () => ({
  type: RESET_SUMMARY_DETAILS
});

export {
  getIssueSummary,
  getIssueSummaryRequest,
  getIssueSummarySuccess,
  getIssueSummaryFailure,
  getSummaryDetails,
  getSummaryDetailsRequest,
  getSummaryDetailsSuccess,
  getSummaryDetailsFailure,
  resetSummary,
  resetSummaryDetails
}
