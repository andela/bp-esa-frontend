import { takeEvery, put } from 'redux-saga/effects';
import toastr from 'toastr';
import 'toastr/toastr.scss';
import { FETCH_REAL_TIME_DATA, RESET_REAL_TIME_DATA } from '../constants';
import { setRealTimeReport, resetRealTimeReportSuccess } from '../actions/realTimeReport';

export function* setRealTimeWorker(action) {
  try {
    const { payload } = action;
    yield put(setRealTimeReport(payload));
  } catch (error) {
    toastr.error('Possible Network error, Please reload!');
  }
}

export function* resetRealTimeWorker() {
  try {
    yield put(resetRealTimeReportSuccess());
  } catch (error) {
    toastr.error('Possible Network error, Please reload!');
  }
}

export function* watchSetRealTimeReport() {
  yield takeEvery(FETCH_REAL_TIME_DATA, setRealTimeWorker);
}

export function* watchResetRealTimeReport() {
  yield takeEvery(RESET_REAL_TIME_DATA, resetRealTimeWorker);
}
