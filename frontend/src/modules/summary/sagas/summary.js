import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_ISSUE_SUMMARY, GET_ISSUE_SUMMARY_DETAILS } from '../actions/types';
import {
  getIssueSummaryRequest,
  getIssueSummarySuccess,
  getIssueSummaryFailure,
  getSummaryDetailsRequest,
  getSummaryDetailsSuccess,
  getSummaryDetailsFailure
} from '../actions/summary';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';

function* getIssueSummary({ summaryRequest }) {
  try {
    yield put(getIssueSummaryRequest());
    const { data } = yield call(API.getIssueSummary, summaryRequest);

    yield put(getIssueSummarySuccess(data));
  } catch (error) {
    yield put(getIssueSummaryFailure(getError(error)));
  }
}

function* watchGetIssueSummary() {
  yield takeLatest(GET_ISSUE_SUMMARY, getIssueSummary);
}

function* getSummaryDetails({ userId, projectId }) {
  try {
    yield put(getSummaryDetailsRequest());
    const { data } = yield call(API.getSummaryDetails, userId, projectId);

    yield put(getSummaryDetailsSuccess(data));
  } catch (error) {
    yield put(getSummaryDetailsFailure(getError(error)));
  }
}

function* watchGetSummaryDetails() {
  yield takeLatest(GET_ISSUE_SUMMARY_DETAILS, getSummaryDetails);
}

export default function* summaryFlow() {
  yield all([
    watchGetIssueSummary(),
    watchGetSummaryDetails()
  ])
}
