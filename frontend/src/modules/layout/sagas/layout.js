import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_CURRENT_USER } from '../actions/types';
import { requestLoadCurrentUser, loadCurrentUserSuccess, loadCurrentUserFailure } from '../actions/layout';
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

export default function* accountFlow() {
  yield all([
    watchLoadCurrentUser(),
  ]);
}
