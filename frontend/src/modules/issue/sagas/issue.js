import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_ISSUE, LOAD_ALL_ISSUES } from '../actions/types';
import {
  createIssueRequest,
  createIssueSuccess,
  createIssueFailure,
  loadAllIssuesSuccess,
  loadAllIssuesFailure
} from '../actions/issue';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';

function* createIssue({ issue, closeModal }) {
  try {
    yield put(createIssueRequest());
    const { data } = yield call(API.createIssue, issue);

    showSuccessNotification(data.message);
    yield put(createIssueSuccess());

    if (closeModal && typeof (closeModal) === 'function') {
      closeModal();
    }
  } catch (error) {
    yield put(createIssueFailure(getError(error)))
  }
}

function* watchCreateIssue() {
  yield takeLatest(CREATE_ISSUE, createIssue)
}

function* loadAllIssues() {
  try {
    const { data } = yield call(API.loadAllIssues);

    yield put(loadAllIssuesSuccess(data));

  } catch (error) {
    yield put(loadAllIssuesFailure(getError(error)))
  }
}

function* watchLoadAllIssues() {
  yield takeLatest(LOAD_ALL_ISSUES, loadAllIssues)
}

export default function* issueFlow() {
  yield all([
    watchCreateIssue(),
    watchLoadAllIssues()
  ])
}
