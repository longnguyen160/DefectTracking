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
import { LOAD_ALL_CATEGORIES, CREATE_CATEGORY } from '../actions/types';

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
  ]);
}
