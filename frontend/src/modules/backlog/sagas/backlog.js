import { all, call, put, takeLatest } from 'redux-saga/effects';
import { UPDATE_BACKLOG } from '../actions/types';
import { updateBacklogRequest, updateBacklogSuccess, updateBacklogFailure } from '../actions/backlog';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';

function* updateBacklog({ projectId, backlog }) {
  try {
    yield put(updateBacklogRequest());

    const { data } = yield call(API.updateBacklog, projectId, backlog);

    yield put(updateBacklogSuccess());
  } catch (error) {
    yield put(updateBacklogFailure(getError(error)))
  }
}

function* watchUpdateBacklog() {
  yield takeLatest(UPDATE_BACKLOG, updateBacklog);
}

export default function* backlogFlow() {
  yield all([
    watchUpdateBacklog()
  ])
}
