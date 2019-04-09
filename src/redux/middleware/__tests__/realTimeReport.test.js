import { expectSaga, testSaga } from 'redux-saga-test-plan';

import {
  SET_REAL_TIME_DATA, FETCH_REAL_TIME_DATA, RESET_REAL_TIME_DATA, RESET_REAL_TIME_DATA_SUCCESS,
} from '../../constants';
import {
  watchSetRealTimeReport, watchResetRealTimeReport, setRealTimeWorker, resetRealTimeWorker,
} from '../realTimeReport';


describe('Test real time report Saga', () => {
  const data = {};
  const error = new Error('My Error');
  it('should update real time data store successfully', () => expectSaga(watchSetRealTimeReport)
    .put({
      type: SET_REAL_TIME_DATA,
      payload: data,
    })
    .dispatch({
      type: FETCH_REAL_TIME_DATA,
      payload: data,
    })
    .silentRun());

  it('should reset real time data store successfully', () => expectSaga(watchResetRealTimeReport)
    .put({
      type: RESET_REAL_TIME_DATA_SUCCESS,
    })
    .dispatch({
      type: RESET_REAL_TIME_DATA,
    })
    .silentRun());

  it('should handle errors for the sagas ', () => {
    const setRealTimeWorkerSaga = testSaga(setRealTimeWorker, data);
    setRealTimeWorkerSaga.next().throw(error).isDone();
    const resetRealTimeWorkerSaga = testSaga(resetRealTimeWorker);
    resetRealTimeWorkerSaga.next().throw(error).isDone();
  });
});
