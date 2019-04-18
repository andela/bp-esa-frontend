import { put, takeLatest, call } from 'redux-saga/effects';
import toastr from 'toastr';
import 'toastr/toastr.scss';
import AutomationAPI from '../api/automationAPI';
import {
  fetchAutomationSuccess,
  fetchAutomationError,
  retryAutomationSuccess,
  retryAutomationFailure,
} from '../actions/automationActions';
import { FETCH_AUTOMATION, RETRY_AUTOMATION } from '../constants';

export function* fetchFellows() {
  try {
    const response = yield call(AutomationAPI.getFellows);
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

export function* retryAutomation(action) {
  try {
    const { automationId } = action;
    const response = yield call(AutomationAPI.retryAutomation, automationId);
    yield put(retryAutomationSuccess(response.data.data));
    toastr.success(response.data.message);
  } catch (e) {
    const error = { error: 'Possible Network error, please reload!' };
    yield put(retryAutomationFailure(error));
    toastr.error('Possible Network error, please reload!');
  }
}

export function* watchRetryAutomation() {
  yield takeLatest(RETRY_AUTOMATION, retryAutomation);
}
