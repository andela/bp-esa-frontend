import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import AutomationAPI from '../../api/automationAPI';
import { FETCH_AUTOMATION_SUCCESS, FETCH_AUTOMATION, FETCH_AUTOMATION_FAILURE } from '../../constants';
import { watchFetchFellows } from '../automationSagas';


describe('Automation Saga', () => {
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
