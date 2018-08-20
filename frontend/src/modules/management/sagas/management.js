import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';
import {
  requestCreateCategory,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  loadAllCategoriesRequest,
  loadAllCategoriesSuccess,
  loadAllCategoriesFailure,
  loadAllCategoryNamesRequest,
  loadAllCategoryNamesSuccess,
  loadAllCategoryNamesFailure,
  loadCategoryDetailsRequest,
  loadCategoryDetailsSuccess,
  loadCategoryDetailsFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure
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
  loadStatusDetailsRequest,
  loadStatusDetailsSuccess,
  loadStatusDetailsFailure,
  requestRemoveStatus,
  removeStatusSuccess,
  removeStatusFailure,
  requestUpdateStatus,
  updateStatusSuccess,
  updateStatusFailure
} from '../actions/status';
import {
  loadAllKPIRequest,
  loadAllKPISuccess,
  loadAllKPIFailure,
  updateKPIRequest,
  updateKPISuccess,
  updateKPIFailure,
  loadUsersKPIRequest,
  loadUsersKPISuccess,
  loadUsersKPIFailure
} from '../actions/kpi';
import {
  LOAD_ALL_PROJECTS_FOR_MANAGEMENT,
  LOAD_ALL_CATEGORIES,
  LOAD_CATEGORY_DETAILS,
  LOAD_ALL_CATEGORY_NAMES,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  CREATE_STATUS,
  LOAD_ALL_STATUS,
  LOAD_STATUS_DETAILS,
  REMOVE_STATUS,
  UPDATE_STATUS,
  UPDATE_STATUS_DEFAULT,
  LOAD_ALL_KPI,
  LOAD_USERS_KPI,
  UPDATE_KPI,
  BAN_USER
}
from '../actions/types';
import { banUserFailure, banUserSuccess, requestBanUser } from '../actions/user';

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
function* updateStatusDefault({ status }) {
  try {
    yield put(requestUpdateStatusDefault(status));

    const {data} = yield call(API.updateStatusDefault, status);

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

//load status details
function* loadStatusDetails({ statusId }) {
  try {
    yield put(loadStatusDetailsRequest());
    const { data } = yield call(API.loadStatusDetails, statusId);

    yield put(loadStatusDetailsSuccess(data));
  } catch (error) {
    yield put(loadStatusDetailsFailure(getError(error)));
  }
}

function* watchLoadStatusDetails() {
  yield takeLatest(LOAD_STATUS_DETAILS, loadStatusDetails);
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

//Category
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

function* updateCategory({ category, closeModal }) {
  try {
    yield put(updateCategoryRequest());

    const { data } = yield call(API.updateCategory, category);

    yield put(updateCategorySuccess());
    showSuccessNotification(data.message);

    if (closeModal && typeof (closeModal) === 'function') {
      closeModal();
    }
  } catch (error) {
    yield put(updateCategoryFailure(getError(error)));
  }
}

function* watchUpdateCategory() {
  yield takeLatest(UPDATE_CATEGORY, updateCategory);
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

function* loadAllCategoryNames() {
  try {
    yield put(loadAllCategoryNamesRequest());

    const { data } = yield call(API.loadAllCategoryNames);

    yield put(loadAllCategoryNamesSuccess(data));
  } catch (error) {
    yield put(loadAllCategoryNamesFailure(getError(error)));
  }
}

function* watchLoadAllCategoryNames() {
  yield takeLatest(LOAD_ALL_CATEGORY_NAMES, loadAllCategoryNames);
}

function* loadCategoryDetails({ categoryId }) {
  try {
    yield put(loadCategoryDetailsRequest());
    const { data } = yield call(API.loadCategoryDetails, categoryId);

    yield put(loadCategoryDetailsSuccess(data));
  } catch (error) {
    yield put(loadCategoryDetailsFailure(getError(error)));
  }
}

function* watchLoadCategoryDetails() {
  yield takeLatest(LOAD_CATEGORY_DETAILS, loadCategoryDetails);
}

function* deleteCategory({ categoryId }) {
  try {
    yield put(deleteCategoryRequest());
    const { data } = yield call(API.deleteCategory, categoryId);

    yield put(deleteCategorySuccess());
    showSuccessNotification(data.message);
  } catch (error) {
    yield put(deleteCategoryFailure(getError(error)));
  }
}

function* watchDeleteCategory() {
  yield takeLatest(DELETE_CATEGORY, deleteCategory);
}

//User
function* banUser({ user }){
  try {
    yield put(requestBanUser());
    const { data } = yield call(API.manageUser, user);
    //tra ve message
    yield put(banUserSuccess());
    showSuccessNotification(data.message);

  } catch (error){
    yield put(banUserFailure(getError((error))));
  }
}

function* watchBanUser(){
  yield takeLatest(BAN_USER, banUser);
}

// KPI
function* loadAllKPI() {
  try {
    yield put(loadAllKPIRequest());

    const { data } = yield call(API.getKPIData);
    yield put(loadAllKPISuccess(data));
  } catch (error) {
    yield put(loadAllKPIFailure(getError(error)));
  }
}

function* watchLoadAllKPI() {
  yield takeLatest(LOAD_ALL_KPI, loadAllKPI);
}

function* updateKPI({ kpi }) {
  try {
    yield put(updateKPIRequest());
    const { data } = yield call(API.updateKPI, kpi);

    showSuccessNotification(data.message);
    yield put(updateKPISuccess());
  } catch (error) {
    yield put(updateKPIFailure(getError(error)));
  }
}

function* watchUpdateKPI() {
  yield takeLatest(UPDATE_KPI, updateKPI);
}

function* loadUsersKPI({ dataRequest }) {
  try {
    yield put(loadUsersKPIRequest());

    const { data } = yield call(API.getUsersKPI, dataRequest);
    yield put(loadUsersKPISuccess(data));
  } catch (error) {
    yield put(loadUsersKPIFailure(getError(error)));
  }
}

function* watchLoadUsersKPI() {
  yield takeLatest(LOAD_USERS_KPI, loadUsersKPI);
}

export default function* managementFlow() {
  yield all([
    watchCreateCategory(),
    watchUpdateCategory(),
    watchLoadAllCategories(),
    watchLoadAllCategoryNames(),
    watchLoadCategoryDetails(),
    watchDeleteCategory(),
    watchCreateStatus(),
    watchLoadAllStatus(),
    watchLoadStatusDetails(),
    watchRemoveStatus(),
    watchUpdateStatus(),
    watchUpdateStatusDefault(),
    watchLoadAllProjectsForManagement(),
    watchBanUser(),
    watchLoadAllKPI(),
    watchUpdateKPI(),
    watchLoadUsersKPI()
  ]);
}
