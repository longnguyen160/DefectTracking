import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_NOTIFICATION,
  LOAD_NOTIFICATIONS,
  SET_NOTIFICATION_TO_SEEN,
  SET_NOTIFICATION_TO_READ,
  SET_ALL_NOTIFICATIONS_TO_SEEN,
  SET_ALL_NOTIFICATIONS_TO_READ,
  SET_ALL_NOTIFICATIONS_TO_DELETE
} from '../actions/types';
import {
  loadNotificationsRequest,
  loadNotificationsSuccess,
  loadNotificationsFailure,
  loadNotificationRequest,
  loadNotificationSuccess,
  loadNotificationFailure,
  setNotificationToSeenRequest,
  setNotificationToSeenSuccess,
  setNotificationToSeenFailure,
  setNotificationToReadRequest,
  setNotificationToReadSuccess,
  setNotificationToReadFailure,
  setAllNotificationsToSeenRequest,
  setAllNotificationsToSeenSuccess,
  setAllNotificationsToSeenFailure,
  setAllNotificationsToReadRequest,
  setAllNotificationsToReadSuccess,
  setAllNotificationsToReadFailure,
  setAllNotificationsToDeleteRequest,
  setAllNotificationsToDeleteSuccess,
  setAllNotificationsToDeleteFailure
} from '../actions/notification';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';

function* loadNotification({}) {
  try {
    yield put(loadNotificationRequest());
    const { data } = yield call(API.loadNotification);

    yield put(loadNotificationSuccess(data));
  } catch (error) {
    yield put(loadNotificationFailure(getError(error)));
  }
}

function* watchLoadNotification() {
  yield takeLatest(LOAD_NOTIFICATION, loadNotification);
}

function* loadNotifications({}) {
  try {
    yield put(loadNotificationsRequest());
    const { data } = yield call(API.loadNotifications);

    yield put(loadNotificationsSuccess(data));
  } catch (error) {
    yield put(loadNotificationsFailure(getError(error)));
  }
}

function* watchLoadNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}

function* setNotificationToSeen({ notificationId }) {
  try {
    yield put(setNotificationToSeenRequest());
    yield call(API.setNotificationToSeen, notificationId);
    yield put(setNotificationToSeenSuccess());
  } catch(error) {
    yield put(setNotificationToSeenFailure(getError(error)));
  }
}

function* watchSetNotificationToSeen() {
  yield takeLatest(SET_NOTIFICATION_TO_SEEN, setNotificationToSeen);
}

function* setNotificationToRead({ notificationId, notificationType }) {
  try {
    yield put(setNotificationToReadRequest());
    yield call(API.setNotificationToRead, notificationId, notificationType);
    yield put(setNotificationToReadSuccess());
  } catch(error) {
    yield put(setNotificationToReadFailure(getError(error)));
  }
}

function* watchSetNotificationToRead() {
  yield takeLatest(SET_NOTIFICATION_TO_READ, setNotificationToRead);
}

function* setAllNotificationsToSeen({}) {
  try {
    yield put(setAllNotificationsToSeenRequest());
    yield call(API.setAllNotificationsToSeen);
    yield put(setAllNotificationsToSeenSuccess());
  } catch(error) {
    yield put(setAllNotificationsToSeenFailure(getError(error)));
  }
}

function* watchSetAllNotificationsToSeen() {
  yield takeLatest(SET_ALL_NOTIFICATIONS_TO_SEEN, setAllNotificationsToSeen);
}

function* setAllNotificationsToRead({}) {
  try {
    yield put(setAllNotificationsToReadRequest());
    const { data } =  yield call(API.setAllNotificationsToRead);

    yield put(setAllNotificationsToReadSuccess(data));
  } catch(error) {
    yield put(setAllNotificationsToReadFailure(getError(error)));
  }
}

function* watchSetAllNotificationsToRead() {
  yield takeLatest(SET_ALL_NOTIFICATIONS_TO_READ, setAllNotificationsToRead);
}

function* setAllNotificationsToDelete({}) {
  try {
    yield put(setAllNotificationsToDeleteRequest());
    yield call(API.setAllNotificationsToDelete);
    yield put(setAllNotificationsToDeleteSuccess());
  } catch(error) {
    yield put(setAllNotificationsToDeleteFailure(getError(error)));
  }
}

function* watchSetAllNotificationsToDelete() {
  yield takeLatest(SET_ALL_NOTIFICATIONS_TO_DELETE, setAllNotificationsToDelete);
}

export default function* notificationFlow() {
  yield all([
    watchLoadNotification(),
    watchLoadNotifications(),
    watchSetNotificationToSeen(),
    watchSetNotificationToRead(),
    watchSetAllNotificationsToSeen(),
    watchSetAllNotificationsToRead(),
    watchSetAllNotificationsToDelete()
  ]);
}

