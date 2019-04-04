import { put, takeLatest, call } from 'redux-saga/effects';
import toastr from 'toastr';
import 'toastr/toastr.scss';
import AutomationAPI from '../api/automationAPI';
import { fetchAutomationSuccess, fetchAutomationError } from '../actions/automation';
import { FETCH_AUTOMATION } from '../constants';

export function* fetchFellows(payload) {
  const { page, limit } = payload;
  try {
    const response = yield call(AutomationAPI.getFellows, page, limit);
    yield put(fetchAutomationSuccess(response.data));
  } catch (e) {
    const error = { error: 'Possible Network error, Please reload!' };
    yield put(fetchAutomationError(error));
    toastr.error('Possible Network error, Please reload!');
  }
}

export function* watchFetchFellows() {
  yield takeLatest(FETCH_AUTOMATION, fetchFellows);
}
