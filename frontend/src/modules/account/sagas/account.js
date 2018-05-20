import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_USER } from '../actions/types';
import { requestLogin, loginSuccess, loginError } from '../actions/login';
import API from '../../../utils/api';
import { setAccessToken, getError } from '../../../utils/ultis';

function* login({ user, goToDashboard }) {
  try {
    yield put(requestLogin(user));

    const { data } = yield call(API.login, user);

    setAccessToken(data);
    yield put(loginSuccess(data.accessToken));

    if (goToDashboard && typeof (goToDashboard) === 'function') {
      goToDashboard();
    }
  } catch (error) {
    yield put(loginError(getError(error)));
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_USER, login);
}

export default function* accountFlow() {
  yield all([
    watchLogin(),
  ]);
}
