import { put, takeLatest, call } from 'redux-saga/effects';
import toaster from 'react-notify-toast';

import { FETCH_AUTOMATION_REQUEST } from '../constants';
import AutomationAPI from '../api/automationApi';
import { fetchAutomationSuccess, fetchAutomationFailure } from '../actions/automationAction';

export function* fetchAutomation() {
  try {
    const response = yield call(AutomationAPI.getAutomation);
    yield put(fetchAutomationSuccess(response.data));
  } catch (error) {
    if (error.response) {
      const err = error.response.message;
      yield put(fetchAutomationFailure(err));
      toaster.error(err);
    }
    const err = 'An error occurred while fetching the automations';
    yield put(fetchAutomation(fetchAutomationFailure(err)));
    toaster.error(err);
  }
}

export function* watchFetchAutomation() {
  yield takeLatest(FETCH_AUTOMATION_REQUEST, fetchAutomation);
}
