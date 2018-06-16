import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_PROJECT, LOAD_ALL_PROJECTS, ADD_USER_TO_PROJECT, LOAD_ALL_USERS_IN_PROJECT } from '../actions/types';
import {
  requestCreateProject,
  createProjectSuccess,
  createProjectFailure,
  loadAllProjectsFailure,
  loadAllProjectsSuccess
} from '../actions/project';
import {
  addUserToProjectRequest,
  addUserToProjectSuccess,
  addUserToProjectFailure,
  loadAllUsersInProjectRequest,
  loadAllUsersInProjectSuccess,
  loadAllUsersInProjectFailure
} from '../actions/usersInProject';
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

function* loadAllProjects() {
  try {
    const { data } = yield call(API.loadAllProjects);

    yield put(loadAllProjectsSuccess(data));
  } catch (error) {
    yield put(loadAllProjectsFailure(getError(error)));
  }
}

function* watchLoadAllProjects() {
  yield takeLatest(LOAD_ALL_PROJECTS, loadAllProjects);
}

function* addUserToProject({ requestData, closeModal }) {
  try {
    yield put(addUserToProjectRequest());

    const { data } = yield call(API.addUserToProject, requestData);

    yield put(addUserToProjectSuccess());
    showSuccessNotification(data.message);

    if (closeModal && typeof (closeModal) === 'function') {
      closeModal();
    }
  } catch (error) {
    yield put(addUserToProjectFailure(getError(error)));
  }
}

function* watchAddUserToProject() {
  yield takeLatest(ADD_USER_TO_PROJECT, addUserToProject);
}

function* loadAllUsersInProject({ projectId }) {
  try {
    yield put(loadAllUsersInProjectRequest());

    const { data } = yield call(API.loadALlUsersInProject, projectId);

    yield put(loadAllUsersInProjectSuccess(data));
  } catch (error) {
    yield put(loadAllUsersInProjectFailure(getError(error)));
  }
}

function* watchLoadAllUsersInProject() {
  yield takeLatest(LOAD_ALL_USERS_IN_PROJECT, loadAllUsersInProject);
}

export default function* projectFlow() {
  yield all([
    watchCreateProject(),
    watchLoadAllProjects(),
    watchAddUserToProject(),
    watchLoadAllUsersInProject()
  ]);
}
