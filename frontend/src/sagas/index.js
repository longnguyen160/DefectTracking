import { all } from 'redux-saga/effects';
import accountFlow from '../modules/account/sagas/account';
import layoutFlow from '../modules/layout/sagas/layout';
import projectFlow from '../modules/projects/sagas/project';
import issueFlow from '../modules/issue/sagas/issue';
import managementFlow from '../modules/management/sagas/management';
import fileFlow from '../modules/file/sagas/file';
import backlogFlow from '../modules/backlog/sagas/backlog';

export default function* rootSaga() {
  yield all([
    accountFlow(),
    layoutFlow(),
    projectFlow(),
    issueFlow(),
    managementFlow(),
    fileFlow(),
    backlogFlow()
  ]);
}
