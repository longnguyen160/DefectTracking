import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';
import {
  requestCreateCategory,
  createCategorySuccess,
  createCategoryFailure,
  loadAllCategoriesRequest,
  loadAllCategoriesSuccess,
  loadAllCategoriesFailure
} from '../actions/category';
import {
  loadAllProjectsForManagementRequest,
  loadAllProjectsForManagementSuccess,
  loadAllProjectsForManagementFailure
}from '../actions/project'
import {
  requestUpdateStatusDefault,
  updateStatusDefaultSuccess,
  updateStatusDefaultFailure,
  requestCreateStatus,
  createStatusSuccess,
  createStatusFailure,
  loadAllStatusRequest,
  loadAllStatusSuccess,
  loadAllStatusFailure,
  requestRemoveStatus,
  removeStatusSuccess,
  removeStatusFailure,
  requestUpdateStatus,
  updateStatusSuccess,
  updateStatusFailure

} from '../actions/status';
import { LOAD_ALL_PROJECTS_FOR_MANAGEMENT, LOAD_ALL_CATEGORIES, CREATE_CATEGORY ,CREATE_STATUS,LOAD_ALL_STATUS, REMOVE_STATUS,UPDATE_STATUS,UPDATE_STATUS_DEFAULT}
from '../actions/types';
// load all projects for management

function* loadAllProjectsForManagement() {
  try {
    yield put(loadAllProjectsForManagementRequest());

    const { data } = yield call(API.loadAllProjectsForManagement);

    yield put(loadAllProjectsForManagementSuccess(data));
  } catch (error) {
    yield put(loadAllProjectsForManagementFailure(getError(error)));
  }
}

function* watchLoadAllProjectsForManagement() {
  yield takeLatest(LOAD_ALL_PROJECTS_FOR_MANAGEMENT, loadAllProjectsForManagement);
}



//update status default
function* updateStatusDefault({ statusId }) {
  try {
    yield put(requestUpdateStatusDefault(statusId));

    const {data} = yield call(API.updateStatusDefault, statusId);

    yield put(updateStatusDefaultSuccess(data));
    showSuccessNotification(data.message);
  } catch (error) {
    yield put(updateStatusDefaultFailure(getError(error)));
  }
}

function* watchUpdateStatusDefault() {
  yield takeLatest(UPDATE_STATUS_DEFAULT, updateStatusDefault);
}

//update status
function* updateStatus({ status }) {
  try {
    yield put(requestUpdateStatus(status));

    const { data } = yield call(API.updateStatus, status);

    yield put(updateStatusSuccess(data));
  } catch (error) {
    yield put(updateStatusFailure(getError(error)));
  }
}

function* watchUpdateStatus() {
  yield takeLatest(UPDATE_STATUS, updateStatus);
}
//removeStatus
function* removeStatus({ statusId }) {
  try {
    yield put(requestRemoveStatus(statusId));
    const { data } = yield call(API.removeStatus, statusId);

    yield put(removeStatusSuccess());
    showSuccessNotification(data.message);
  } catch (error) {
    yield put(removeStatusFailure(getError(error)));
  }
}

function* watchRemoveStatus() {
  yield takeLatest(REMOVE_STATUS, removeStatus);
}

//load all status

function* loadAllStatus({ role }) {
  try {
    yield put(loadAllStatusRequest());

    const { data } = yield call(API.loadAllStatus, role);

    yield put(loadAllStatusSuccess(data));
  } catch (error) {
    yield put(loadAllStatusFailure(getError(error)));
  }
}

function* watchLoadAllStatus() {
  yield takeLatest(LOAD_ALL_STATUS, loadAllStatus);
}
// create status
function* createStatus({ status, closeModal }){
  try {
    yield put(requestCreateStatus());

    const { data } = yield call(API.createStatus, status);
    yield put(createStatusSuccess());
    showSuccessNotification(data.message);

    if (closeModal && typeof (closeModal) === 'function') {
      closeModal();
    }
  } catch (error) {
    yield put(createStatusFailure(getError(error)))
  }
}

function* watchCreateStatus() {
  yield takeLatest(CREATE_STATUS, createStatus);
}

function* createCategory({ category, closeModal }) {
  try {
    yield put(requestCreateCategory());

    const { data } = yield call(API.createCategory, category);

    yield put(createCategorySuccess());
    showSuccessNotification(data.message);

    if (closeModal && typeof (closeModal) === 'function') {
      closeModal();
    }
  } catch (error) {
    yield put(createCategoryFailure(getError(error)));
  }
}

function* watchCreateCategory() {
  yield takeLatest(CREATE_CATEGORY, createCategory);
}

function* loadAllCategories() {
  try {
    yield put(loadAllCategoriesRequest());

    const { data } = yield call(API.loadAllCategories);

    yield put(loadAllCategoriesSuccess(data));
  } catch (error) {
    yield put(loadAllCategoriesFailure(getError(error)));
  }
}

function* watchLoadAllCategories() {
  yield takeLatest(LOAD_ALL_CATEGORIES, loadAllCategories);
}

export default function* managementFlow() {
  yield all([
    watchCreateCategory(),
    watchLoadAllCategories(),
    watchCreateStatus(),
    watchLoadAllStatus(),
    watchRemoveStatus(),
    watchUpdateStatus(),
    watchUpdateStatusDefault(),
    watchLoadAllProjectsForManagement(),
  ]);
}
