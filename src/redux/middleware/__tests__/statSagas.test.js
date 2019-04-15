import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { watchFetchStats } from '../statSagas';
import StatsAPI from '../../api/automationStatApi';
import { fetchStatsFailure, fetchStatsRequest, fetchStatsSuccess } from '../../actions/automationStats';

describe('The statistics saga', () => {
  const expectedResponse = {
    data: {
      automation: {
        success: 1,
        total: 191,
      },
      onboarding: {
        success: 1,
        total: 191,
      },
      offboarding: {
        success: 1,
        total: 191,
      },
      freckle: {
        success: 1,
        total: 191,
      },
      slack: {
        success: 1,
        total: 191,
      },
      email: {
        success: 1,
        total: 191,
      },
    },
  };

  it('should fetch statistics successfully', () => expectSaga(watchFetchStats)
    .provide([
      [call(StatsAPI.getStats), expectedResponse],
    ])
    .put(fetchStatsSuccess(expectedResponse.data))
    .dispatch(fetchStatsRequest())
    .silentRun());

  it('should test dispatch FETCH_AUTOMATION_FAILURE on failure', () => expectSaga(watchFetchStats)
    .provide([
      [matchers.call.fn(StatsAPI.getStats), throwError({})],
    ])
    .put(fetchStatsFailure({}))
    .dispatch(fetchStatsRequest())
    .silentRun());
});
