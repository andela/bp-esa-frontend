/* istanbul ignore file */
import { all } from 'redux-saga/effects';
import { watchFetchStats } from './statSagas';
import { watchFetchFellows, watchRetryAutomation } from './automationSagas';

export default function* rootSagas() {
  yield all([
    watchFetchFellows(),
    watchFetchStats(),
    watchRetryAutomation(),
  ]);
}
