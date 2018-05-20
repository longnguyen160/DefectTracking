import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, SIGN_UP_USER } from '../actions/types';
import { requestLogin, loginSuccess, loginError } from '../actions/login';
import { requestSignUp, signUpSuccess, signUpError } from '../actions/signUp';
import API from '../../../utils/api';
import { setAccessToken, getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/Notifications';

// Login
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

// SignUp
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

export default function* accountFlow() {
  yield all([
    watchLogin(),
    watchSignUp()
  ]);
}
