import { all } from 'redux-saga/effects';
import accountFlow from '../modules/account/sagas/account';

export default function* rootSaga() {
  yield all([
    accountFlow()
  ]);
}
