import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_CURRENT_USER, LOG_OUT } from '../actions/types';
import { requestLoadCurrentUser, loadCurrentUserSuccess, loadCurrentUserFailure } from '../actions/layout';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';

function* loadCurrentUser() {
  try {
    yield put(requestLoadCurrentUser());

    const { data } = yield call(API.loadCurrentUser);

    yield put(loadCurrentUserSuccess(data));
  } catch (error) {
    yield put(loadCurrentUserFailure(getError(error)))
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
