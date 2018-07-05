import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_CURRENT_USER, LOAD_PROJECT_DETAILS } from '../actions/types';
import {
  requestLoadCurrentUser,
  loadCurrentUserSuccess,
  loadCurrentUserFailure,
  loadProjectDetailsRequest,
  loadProjectDetailsSuccess,
  loadProjectDetailsFailure
} from '../actions/layout';
import API from '../../../utils/api';
import { getError, removeAccessToken } from '../../../utils/ultis';

function* loadCurrentUser({ goToLoginPage }) {
  try {
    yield put(requestLoadCurrentUser());

    const { data } = yield call(API.loadCurrentUser);

    yield put(loadCurrentUserSuccess(data));
  } catch (error) {
    yield put(loadCurrentUserFailure(getError(error)));

    removeAccessToken();
    if (goToLoginPage && typeof (goToLoginPage) === 'function') {
      goToLoginPage();
    }
  }
}

function* watchLoadCurrentUser() {
  yield takeLatest(LOAD_CURRENT_USER, loadCurrentUser);
}

function* loadProjectDetails({ projectId, selectProject }) {
  try {
    yield put(loadProjectDetailsRequest());

    const { data } = yield call(API.loadProjectDetails, projectId);

    if (selectProject && typeof (selectProject) === 'function') {
      selectProject(data);
    } else {
      yield put(loadProjectDetailsSuccess(data));
    }
  } catch (error) {
    yield put(loadProjectDetailsFailure(getError((error))));
  }
}

function* watchLoadProjectDetails() {
  yield takeLatest(LOAD_PROJECT_DETAILS, loadProjectDetails);
}

export default function* accountFlow() {
  yield all([
    watchLoadCurrentUser(),
    watchLoadProjectDetails()
  ]);
}
