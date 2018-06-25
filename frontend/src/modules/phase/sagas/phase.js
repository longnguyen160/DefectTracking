import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  CREATE_PHASE,
  LOAD_ALL_PHASES,
  LOAD_ACTIVE_PHASE,
  UPDATE_PHASE_ISSUES_LIST
} from '../actions/types';
import {
  requestCreatePhase,
  createPhaseSuccess,
  createPhaseFailure,
  loadAllPhasesRequest,
  loadAllPhasesSuccess,
  loadAllPhasesFailure,
  loadActivePhaseRequest,
  loadActivePhaseSuccess,
  loadActivePhaseFailure,
  updatePhaseIssuesListRequest,
  updatePhaseIssuesListSuccess,
  updatePhaseIssuesListFailure
} from '../actions/phase';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';

function* createPhase({ phase, closeModal }) {
  try {
    yield put(requestCreatePhase());

    const { data } = yield call(API.createPhase, phase);

    yield put(createPhaseSuccess());
    showSuccessNotification(data.message);

    if (closeModal && typeof (closeModal) === 'function') {
      closeModal();
    }
  } catch (error) {
    yield put(createPhaseFailure(getError((error))));
  }
}

function* watchCreatePhase() {
  yield takeLatest(CREATE_PHASE, createPhase);
}

function* loadAllPhases({ projectId }) {
  try {
    yield put(loadAllPhasesRequest());
    const { data } = yield call(API.loadAllPhases, projectId);

    yield put(loadAllPhasesSuccess(data));
  } catch (error) {
    yield put(loadAllPhasesFailure(getError(error)));
  }
}

function* watchLoadAllPhases() {
  yield takeLatest(LOAD_ALL_PHASES, loadAllPhases);
}

function* loadActivePhase({ projectId }) {
  try {
    yield put(loadActivePhaseRequest());
    const { data } = yield call(API.loadActivePhase, projectId);

    yield put(loadActivePhaseSuccess(data));
  } catch (error) {
    yield put(loadActivePhaseFailure(getError(error)));
  }
}

function* watchLoadActivePhase() {
  yield takeLatest(LOAD_ACTIVE_PHASE, loadActivePhase);
}

function* updatePhaseIssuesList({ phaseId, issueList }) {
  try {
    yield put(updatePhaseIssuesListRequest());

    yield call(API.updatePhaseIssuesList, phaseId, issueList);

    yield put(updatePhaseIssuesListSuccess());
  } catch (error) {
    yield put(updatePhaseIssuesListFailure(getError(error)))
  }
}

function* watchUpdatePhaseIssuesList() {
  yield takeEvery(UPDATE_PHASE_ISSUES_LIST, updatePhaseIssuesList);
}

export default function* phaseFlow() {
  yield all([
    watchCreatePhase(),
    watchLoadAllPhases(),
    watchLoadActivePhase(),
    watchUpdatePhaseIssuesList()
  ]);
}
