/* istanbul ignore file */
import { all } from 'redux-saga/effects';
import { watchFetchStats } from './statSagas';
import { watchFetchFellows, watchRetryAutomation } from './automationSagas';
import { watchSetRealTimeReport, watchResetRealTimeReport } from './realTimeReport';

export default function* rootSagas() {
  yield all([
    watchFetchFellows(),
    watchFetchStats(),
    watchRetryAutomation(),
    watchSetRealTimeReport(),
    watchResetRealTimeReport(),
  ]);
}
