import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  UPDATE_BACKLOG,
  LOAD_ALL_ISSUES_FROM_BACKLOG,
  GET_FILTER,
  UPDATE_FILTER
} from '../actions/types';
import {
  getFilterRequest,
  getFilterSuccess,
  getFilterFailure,
  updateBacklogRequest,
  updateBacklogSuccess,
  updateBacklogFailure,
  loadAllIssuesFromBacklogRequest,
  loadAllIssuesFromBacklogSuccess,
  loadAllIssuesFromBacklogFailure,
  updateFilterRequest,
  updateFilterSuccess,
  updateFilterFailure,
} from '../actions/backlog';
import API from '../../../utils/api';
import { getError } from '../../../utils/ultis';

//get filter by userId
function* getFilter({ userId }) {
  try {
    yield put(getFilterRequest());
    const { data } = yield call(API.getFilter, userId);

    if (data && typeof (data) === 'object') {
      yield put(getFilterSuccess(data));
    }
  } catch (error) {
    yield put(getFilterFailure(getError(error)))
  }
}

function* watchGetFilter(){
  yield takeLatest(GET_FILTER,getFilter);
}

//update back log
function* updateBacklog({ projectId, backlog }) {
  try {
    yield put(updateBacklogRequest());
    yield call(API.updateBacklog, projectId, backlog);
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

function* updateFilter({ filter }) {
  try {
    yield put(updateFilterRequest());
    yield call(API.updateFilter, filter);
    yield put(updateFilterSuccess());
  } catch (error) {
    yield put(updateFilterFailure(getError(error)))
  }
}

function* watchUpdateFilter() {
  yield takeLatest(UPDATE_FILTER, updateFilter);
}

export default function* backlogFlow() {
  yield all([
    watchGetFilter(),
    watchUpdateBacklog(),
    watchLoadAllIssuesFromBacklog(),
    watchUpdateFilter()
  ])
}
