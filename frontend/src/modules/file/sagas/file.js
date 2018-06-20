import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { UPLOAD_FILE, LOAD_FILE, DELETE_FILE } from '../actions/types';
import {
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileFailure,
  loadFileRequest,
  loadFileSuccess,
  loadFileFailure,
  deleteFileRequest,
  deleteFileSuccess,
  deleteFileFailure
} from '../actions/file';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';
import { showSuccessNotification } from '../../../components/notification/Notifications';

function* uploadFile({ file }) {
  try {
    yield put(uploadFileRequest());

    const { data } = yield call(API.uploadFile, file);

    yield put(uploadFileSuccess(data));
  } catch (error) {
    yield put(uploadFileFailure(getError(error)));
  }
}

function* watchUploadFile() {
  yield takeLatest(UPLOAD_FILE, uploadFile);
}

function* loadFile({ fileId }) {
  try {
    yield put(loadFileRequest());

    const { data } = yield call(API.loadFile, fileId);

    yield put(loadFileSuccess(data));
  } catch (error) {
    yield put(loadFileFailure(getError(error)));
  }
}

function* watchLoadFile() {
  yield takeEvery(LOAD_FILE, loadFile);
}

function* deleteFile({ fileId }) {
  try {
    yield put(deleteFileRequest());

    const { data } = yield call(API.deleteFile, fileId);

    showSuccessNotification(data.message);
    yield put(deleteFileSuccess(fileId));
  } catch (error) {
    yield put(deleteFileFailure(getError(error)));
  }
}

function* watchDeleteFile() {
  yield takeLatest(DELETE_FILE, deleteFile);
}

export default function* fileFlow() {
  yield all([
    watchUploadFile(),
    watchLoadFile(),
    watchDeleteFile()
  ]);
}
