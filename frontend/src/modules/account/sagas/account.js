import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, SIGN_UP_USER, LOG_OUT } from '../actions/types';
import { requestLogin, loginSuccess, loginError } from '../actions/login';
import { requestSignUp, signUpSuccess, signUpError } from '../actions/signUp';
import { requestLogOut, logOutSuccess, logOutFailure } from '../actions/logout';
import API from '../../../utils/api';
import { setAccessToken, removeAccessToken, getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/Notifications';

// Login
function* login({ user, goToDashboard }) {
  try {
    yield put(requestLogin());
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

// Sign Up
function* signUp({ user, goToLoginPage }) {
  try {
    yield put(requestSignUp(user));
    const { data } = yield call(API.signUp, user);

    yield put(signUpSuccess());
    showSuccessNotification(data.message);

    if (goToLoginPage && typeof (goToLoginPage) === 'function') {
      goToLoginPage()
    }
  } catch (error) {
    yield put(signUpError(getError(error)))
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_USER, signUp);
}

// Log Out
function* logOut({ goToLoginPage }) {
  try {
    yield put(requestLogOut());

    removeAccessToken();
    yield put(logOutSuccess());

    if (goToLoginPage && typeof (goToLoginPage) === 'function') {
      goToLoginPage()
    }
  } catch (error) {
    yield put(logOutFailure(getError(error)))
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT, logOut)
}


export default function* accountFlow() {
  yield all([
    watchLogin(),
    watchSignUp(),
    watchLogOut()
  ]);
}
