import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_ALL_CATEGORIES_IN_PROJECT, LOAD_CURRENT_USER, LOAD_PROJECT_DETAILS } from '../actions/types';
import {
  loadAllCategoriesInProjectRequest,
  loadAllCategoriesInProjectSuccess,
  loadAllCategoriesInProjectFailure,
  requestLoadCurrentUser,
  loadCurrentUserSuccess,
  loadCurrentUserFailure,
  loadProjectDetailsRequest,
  loadProjectDetailsSuccess,
  loadProjectDetailsFailure
} from '../actions/layout';
import API from '../../../utils/api';
import { getError, removeAccessToken } from '../../../utils/ultis';
// load all categories in project 
function* loadAllCategoriesInProject({ projectId }) {
  try {
    yield put(loadAllCategoriesInProjectRequest());
    
    const { data } = yield call(API.loadAllCategoriesInProject, projectId);

    yield put(loadAllCategoriesInProjectSuccess(data));
  } catch (error) {
    yield put(loadAllCategoriesInProjectFailure(getError(error)));
  }
}

function* watchLoadAllCategoriesInProject(){
  yield takeLatest(LOAD_ALL_CATEGORIES_IN_PROJECT, loadAllCategoriesInProject);
}


// load current user
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
    watchLoadAllCategoriesInProject(),
    watchLoadCurrentUser(),
    watchLoadProjectDetails()
  ]);
}
