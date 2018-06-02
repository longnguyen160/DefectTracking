import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_PROJECT, LOAD_ALL_PROJECTS } from '../actions/types';
import {
  requestCreateProject,
  createProjectSuccess,
  createProjectFailure,
  loadAllProjectsFailure,
  loadAllProjectsSuccess
} from '../actions/project';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';

function* createProject({ project, closeModal }) {
  try {
    yield put(requestCreateProject());

    const { data } = yield call(API.createProject, project);

    yield put(createProjectSuccess());
    showSuccessNotification(data.message);

    if (closeModal && typeof (closeModal) === 'function') {
      closeModal();
    }
  } catch (error) {
    yield put(createProjectFailure(getError((error))));
  }
}

function* watchCreateProject() {
  yield takeLatest(CREATE_PROJECT, createProject);
}

function* loadAllProjects(userId) {
  try {
    const { data } = yield call(API.loadAllProjects, userId);

    yield put(loadAllProjectsSuccess(data));
  } catch (error) {
    yield put(loadAllProjectsFailure(getError(error)));
  }
}

function* watchLoadAllProjects() {
  yield takeLatest(LOAD_ALL_PROJECTS, loadAllProjects);
}

export default function* projectFlow() {
  yield all([
    watchCreateProject(),
    watchLoadAllProjects()
  ]);
}
