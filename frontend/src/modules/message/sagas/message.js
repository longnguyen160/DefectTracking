import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_MESSAGE,
  LOAD_ALL_MESSAGES,
  LOAD_ALL_MESSAGES_ON_ISSUES,
  EDIT_MESSAGE
} from '../actions/types';
import {
  createMessageRequest,
  createMessageSuccess,
  createMessageFailure,
  loadAllMessagesRequest,
  loadAllMessagesSuccess,
  loadAllMessagesFailure,
  loadAllMessagesOnIssueRequest,
  loadAllMessagesOnIssueSuccess,
  loadAllMessagesOnIssueFailure,
  editMessageRequest,
  editMessageSuccess,
  editMessageFailure
} from '../actions/message';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';

function* createMessage({ message, loading }) {
  try {
    yield put(createMessageRequest(loading));
    yield call(API.createMessage, message);
    yield put(createMessageSuccess());
  } catch (error) {
    yield put(createMessageFailure(getError(error)));
  }
}

function* watchCreateMessage() {
  yield takeLatest(CREATE_MESSAGE, createMessage);
}

function* loadAllMessagesOnIssue({ issueId, messageType, loading }) {
  try {
    yield put(loadAllMessagesOnIssueRequest(loading));
    const { data } = yield call(API.loadAllMessagesOnIssue, issueId, messageType);

    yield put(loadAllMessagesOnIssueSuccess(data));
  } catch (error) {
    yield put(loadAllMessagesOnIssueFailure(getError(error)))
  }
}

function* watchLoadAllMessagesOnIssue() {
  yield takeLatest(LOAD_ALL_MESSAGES_ON_ISSUES, loadAllMessagesOnIssue);
}

function* loadAllMessages({}) {
  try {
    yield put(loadAllMessagesRequest());
    const { data } = yield call(API.loadAllMessages);

    yield put(loadAllMessagesSuccess(data));
  } catch (error) {
    yield put(loadAllMessagesFailure(getError(error)))
  }
}

function* watchLoadAllMessages() {
  yield takeLatest(LOAD_ALL_MESSAGES, loadAllMessages);
}

function* editMessage({ message }) {
  try {
    yield put(editMessageRequest());
    const { data } = yield call(API.editMessage, message);

    showSuccessNotification(data.message);
    yield put(editMessageSuccess());
  } catch (error) {
    yield put(editMessageFailure(getError(error)));
  }
}

function* watchEditMessage() {
  yield takeLatest(EDIT_MESSAGE, editMessage);
}

export default function* messageFlow() {
  yield all([
    watchCreateMessage(),
    watchLoadAllMessagesOnIssue(),
    watchLoadAllMessages(),
    watchEditMessage()
  ]);
}
