/* istanbul ignore file */
import { all } from 'redux-saga/effects';
import { watchFetchFellows } from './automationSagas';
import { watchFetchStats } from './statSagas';

export default function* rootSagas() {
  yield all([
    watchFetchFellows(),
    watchFetchStats(),
  ]);
}
