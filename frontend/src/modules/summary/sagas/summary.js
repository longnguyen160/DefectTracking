import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_ISSUE_SUMMARY } from '../actions/types';
import { getIssueSummaryRequest, getIssueSummarySuccess, getIssueSummaryFailure } from '../actions/summary';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';

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

export default function* summaryFlow() {
  yield all([
    watchGetIssueSummary()
  ])
}
