import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_STATS_REQUEST } from '../constants';
import {
  fetchStatsSuccess,
  fetchStatsFailure,
} from '../actions/automationStats';
import StatsAPI from '../api/automationStatApi';

export function* fetchStats() {
  try {
    const response = yield call(StatsAPI.getStats);
    yield put(fetchStatsSuccess(response.data));
  } catch (error) {
    yield put(fetchStatsFailure(error));
  }
}

export function* watchFetchStats() {
  yield takeLatest(FETCH_STATS_REQUEST, fetchStats);
}
