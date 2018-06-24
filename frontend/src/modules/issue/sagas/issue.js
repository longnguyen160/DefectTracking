import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_ISSUE, LOAD_ALL_ISSUES, LOAD_ALL_ISSUES_SHORTCUT, LOAD_ISSUE_DETAILS, UPDATE_ISSUE } from '../actions/types';
import {
  createIssueRequest,
  createIssueSuccess,
  createIssueFailure,
  loadAllIssuesSuccess,
  loadAllIssuesFailure,
  loadAllIssuesShortcutRequest,
  loadAllIssuesShortcutSuccess,
  loadAllIssuesShortcutFailure,
  loadIssueDetailsRequest,
  loadIssueDetailsSuccess,
  loadIssueDetailsFailure,
  updateIssueRequest,
  updateIssueSuccess,
  updateIssueFailure
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

function* loadAllIssuesShortcut({ userId }) {
  try {
    yield put(loadAllIssuesShortcutRequest());

    const { data } = yield call(API.loadAllIssuesShortcut, userId);

    yield put(loadAllIssuesShortcutSuccess(data));
  } catch (error) {
    yield put(loadAllIssuesShortcutFailure(getError(error)))
  }
}

function* watchLoadAllIssuesShortcut() {
  yield takeLatest(LOAD_ALL_ISSUES_SHORTCUT, loadAllIssuesShortcut)
}

function* loadIssueDetails({ issueId }) {
  try {
    yield put(loadIssueDetailsRequest());

    const { data } = yield call(API.loadIssueDetails, issueId);

    yield put(loadIssueDetailsSuccess(data));
  } catch (error) {
    yield put(loadIssueDetailsFailure(getError(error)))
  }
}

function* watchLoadIssueDetails() {
  yield takeLatest(LOAD_ISSUE_DETAILS, loadIssueDetails);
}

function* updateIssue({ issueData }) {
  try {
    yield put(updateIssueRequest());

    const { data } = yield call(API.updateIssue, issueData);

    yield put(updateIssueSuccess());
    showSuccessNotification(data.message);
  } catch (error) {
    yield put(updateIssueFailure(getError(error)))
  }
}

function* watchUpdateIssue() {
  yield takeLatest(UPDATE_ISSUE, updateIssue);
}

export default function* issueFlow() {
  yield all([
    watchCreateIssue(),
    watchLoadAllIssues(),
    watchLoadAllIssuesShortcut(),
    watchLoadIssueDetails(),
    watchUpdateIssue()
  ])
}
