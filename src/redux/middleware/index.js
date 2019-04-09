/* istanbul ignore file */
import { all } from 'redux-saga/effects';
import { watchFetchFellows } from './automationSagas';
import { watchSetRealTimeReport, watchResetRealTimeReport } from './realTimeReport';

export default function* rootSagas() {
  yield all([
    watchFetchFellows(),
    watchSetRealTimeReport(),
    watchResetRealTimeReport(),
  ]);
}
