import { all, call, put, takeLatest } from 'redux-saga/effects';
import { UPDATE_BACKLOG, LOAD_ALL_ISSUES_FROM_BACKLOG } from '../actions/types';
import {
  
  updateBacklogRequest,
  updateBacklogSuccess,
  updateBacklogFailure,
  loadAllIssuesFromBacklogRequest,
  loadAllIssuesFromBacklogSuccess,
  loadAllIssuesFromBacklogFailure
} from '../actions/backlog';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';



//update back log
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

function* loadAllIssuesFromBacklog({ issueList }) {
  try {
    yield put(loadAllIssuesFromBacklogRequest());

    const { data } = yield call(API.loadAllIssuesFromBacklog, issueList);

    yield put(loadAllIssuesFromBacklogSuccess(data));
  } catch (error) {
    yield put(loadAllIssuesFromBacklogFailure(getError(error)))
  }
}

function* watchLoadAllIssuesFromBacklog() {
  yield takeLatest(LOAD_ALL_ISSUES_FROM_BACKLOG, loadAllIssuesFromBacklog)
}


export default function* backlogFlow() {
  yield all([
    watchUpdateBacklog(),
    watchLoadAllIssuesFromBacklog()
  ])
}
