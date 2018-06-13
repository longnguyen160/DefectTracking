import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, SIGN_UP_USER, LOG_OUT, LOAD_ALL_USERS, UPDATE_PROFILE } from '../actions/types';
import { requestLogin, loginSuccess, loginError } from '../actions/login';
import { requestSignUp, signUpSuccess, signUpError } from '../actions/signUp';
import { requestLogOut, logOutSuccess, logOutFailure } from '../actions/logout';
import { loadAllUsersSuccess, loadAllUsersFailure } from '../actions/account';
import { updateProfileRequest, updateProfileSuccess, updateProfileFailure } from '../actions/update';
import API from '../../../utils/api';
import { setAccessToken, setExpiryDate, removeAccessToken, getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';

// Login
function* login({ user, goToDashboard }) {
  try {
    yield put(requestLogin());
    const { data } = yield call(API.login, user);

    setAccessToken(data.accessToken.token);
    setExpiryDate(data.accessToken.expiryDate);

    yield put(loginSuccess(data.accessToken.token));

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
    yield put(requestSignUp());
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

function* loadAllUsers({ input }) {
  try {
    let text = '';

    if (input) {
      text = input;
    }

    const { data } = yield call(API.loadAllUsers, text);

    yield put(loadAllUsersSuccess(data));
  } catch (error) {
    yield put(loadAllUsersFailure(getError(error)));
  }
}

function* watchLoadAllUsers() {
  yield takeLatest(LOAD_ALL_USERS, loadAllUsers);
}

function* updateProfile({ profile, email }) {
  try {
    yield put(updateProfileRequest());
    const { data } = yield call(API.updateProfile, { profile, email });

    yield put(updateProfileSuccess());
    showSuccessNotification(data.message);
  } catch (error) {
    yield put(updateProfileFailure(getError(error)))
  }
}

function* watchUpdateProfile() {
  yield takeLatest(UPDATE_PROFILE, updateProfile);
}

export default function* accountFlow() {
  yield all([
    watchLogin(),
    watchSignUp(),
    watchLogOut(),
    watchLoadAllUsers(),
    watchUpdateProfile()
  ]);
}
