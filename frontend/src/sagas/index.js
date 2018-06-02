import { all } from 'redux-saga/effects';
import accountFlow from '../modules/account/sagas/account';
import layoutFlow from '../modules/layout/sagas/layout';

export default function* rootSaga() {
  yield all([
    accountFlow(),
    layoutFlow()
  ]);
}
