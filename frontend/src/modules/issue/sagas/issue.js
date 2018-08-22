import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  CREATE_ISSUE,
  LOAD_ALL_ISSUES,
  LOAD_ALL_ISSUES_SHORTCUT,
  LOAD_ISSUE_DETAILS,
  UPDATE_ISSUE,
  DELETE_ISSUE,
  LOAD_ISSUE_SHORTCUT,
  LOAD_ALL_ISSUES_BASED_ON_FILTER
} from '../actions/types';
import {
  createIssueRequest,
  createIssueSuccess,
  createIssueFailure,
  loadAllIssuesRequest,
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
  updateIssueFailure,
  deleteIssueRequest,
  deleteIssueSuccess,
  deleteIssueFailure,
  loadIssueShortcutRequest,
  loadIssueShortcutSuccess,
  loadIssueShortcutFailure,
  loadAllIssuesBasedOnFilterRequest,
  loadAllIssuesBasedOnFilterSuccess,
  loadAllIssuesBasedOnFilterFailure
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

function* loadAllIssues({ request }) {
  try {
    yield put(loadAllIssuesRequest());
    const { data } = yield call(API.loadAllIssues, request);

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

function* loadIssueDetails({ issueId, loading }) {
  try {
    yield put(loadIssueDetailsRequest(loading));

    const { data } = yield call(API.loadIssueDetails, issueId);

    yield put(loadIssueDetailsSuccess(data));
  } catch (error) {
    yield put(loadIssueDetailsFailure(getError(error)))
  }
}

function* watchLoadIssueDetails() {
  yield takeLatest(LOAD_ISSUE_DETAILS, loadIssueDetails);
}

function* loadIssueShortcut({ issueId }) {
  try {
    yield put(loadIssueShortcutRequest());

    const { data } = yield call(API.loadIssueShortcut, issueId);

    yield put(loadIssueShortcutSuccess(data));
  } catch (error) {
    yield put(loadIssueShortcutFailure(getError(error)))
  }
}

function* watchLoadIssueShortcut() {
  yield takeEvery(LOAD_ISSUE_SHORTCUT, loadIssueShortcut);
}

function* updateIssue({ issueData }) {
  try {
    yield put(updateIssueRequest());
    let api = API.updateIssue;

    if (issueData.type === 'categories') {
      api = API.updateIssueCategories;
    }
    const { data } = yield call(api, issueData);

    yield put(updateIssueSuccess());
    showSuccessNotification(data.message);
  } catch (error) {
    yield put(updateIssueFailure(getError(error)))
  }
}

function* watchUpdateIssue() {
  yield takeLatest(UPDATE_ISSUE, updateIssue);
}

function* deleteIssue({ issueId, closeModal }) {
  try {
    yield put(deleteIssueRequest());
    const { data } = yield call(API.deleteIssue, issueId);

    yield put(deleteIssueSuccess());
    showSuccessNotification(data.message);
    if (closeModal && typeof closeModal === 'function') {
      closeModal();
    }
  } catch (error) {
    yield put(deleteIssueFailure(getError(error)))
  }
}

function* watchDeleteIssue() {
  yield takeLatest(DELETE_ISSUE, deleteIssue);
}

function* loadAllIssuesBasedOnFilter({ issueListRequest, filter }) {
  try {
    yield put(loadAllIssuesBasedOnFilterRequest());
    const { data } = yield call(API.loadAllIssuesBasedOnFilter, issueListRequest, filter);

    yield put(loadAllIssuesBasedOnFilterSuccess(data));
  } catch (error) {
    yield put(loadAllIssuesBasedOnFilterFailure(getError(error)));
  }
}

function* watchLoadAllIssuesBasedOnFilter() {
  yield takeLatest(LOAD_ALL_ISSUES_BASED_ON_FILTER, loadAllIssuesBasedOnFilter);
}

export default function* issueFlow() {
  yield all([
    watchCreateIssue(),
    watchLoadAllIssues(),
    watchLoadAllIssuesShortcut(),
    watchLoadIssueShortcut(),
    watchLoadIssueDetails(),
    watchUpdateIssue(),
    watchDeleteIssue(),
    watchLoadAllIssuesBasedOnFilter()
  ])
}
