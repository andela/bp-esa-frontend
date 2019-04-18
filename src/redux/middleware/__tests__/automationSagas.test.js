import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import AutomationAPI from '../../api/automationAPI';
import {
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_FAILURE,
  RETRY_AUTOMATION,
  RETRY_AUTOMATION_SUCCESS,
  RETRY_AUTOMATION_FAILURE,
} from '../../constants';
import { watchFetchFellows, watchRetryAutomation } from '../automationSagas';

describe('Automation Saga', () => {
  describe('Fetch Automation Saga', () => {
    const response = {
      data: {
        data: {},
        message: 'Successfully fetched automations',
        status: 'success',
      },
    };

    const error = {

    };


    it('should fetch automation successfully', () => expectSaga(watchFetchFellows)
      .provide([
        [call(AutomationAPI.getFellows), response],
      ])
      .put({
        type: FETCH_AUTOMATION_SUCCESS,
        payload: {
          data: {},
          message: 'Successfully fetched automations',
          status: 'success',
        },
      })
      .dispatch({
        type: FETCH_AUTOMATION,
      })
      .silentRun());

    it('should test fetch automation failure', () => expectSaga(watchFetchFellows)
      .provide([
        [matchers.call.fn(AutomationAPI.getFellows), throwError(error)],
      ])
      .put({
        type: FETCH_AUTOMATION_FAILURE,
        payload: { error: 'Possible Network error, Please reload!' },
      })
      .dispatch({ type: FETCH_AUTOMATION })
      .silentRun());
  });

  describe('Retry Automation Saga', () => {
    const automationId = 3014;
    const response = {
      data: {
        data: {
          message: 'Resource successfully retried',
          data: {},
        },
      },
    };

    const error = {};

    it('should retry a failed automation successfully', () => expectSaga(watchRetryAutomation)
      .provide([
        [call(AutomationAPI.retryAutomation, automationId), response],
      ])
      .put({
        type: RETRY_AUTOMATION_SUCCESS,
        automationData: {
          message: 'Resource successfully retried',
          data: {},
        },
      })
      .dispatch({
        type: RETRY_AUTOMATION,
        automationId,
      })
      .silentRun());

    it('should test retry automation failure', () => expectSaga(watchRetryAutomation)
      .provide([
        [matchers.call.fn(AutomationAPI.retryAutomation, automationId), throwError(error)],
      ])
      .put({
        type: RETRY_AUTOMATION_FAILURE,
        error: { error: 'Possible Network error, please reload!' },
      })
      .dispatch({ type: RETRY_AUTOMATION, id: '898iu9' })
      .silentRun());
  });
});
