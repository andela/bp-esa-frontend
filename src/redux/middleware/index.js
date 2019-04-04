/* istanbul ignore file */
import { all } from 'redux-saga/effects';
import { watchFetchFellows } from './automationSagas';

export default function* rootSagas() {
  yield all([
    watchFetchFellows(),
  ]);
}
