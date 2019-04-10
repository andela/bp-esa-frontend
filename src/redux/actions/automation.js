import {
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION_FAILURE,
} from '../constants';

export const fetchAutomation = () => ({
  type: FETCH_AUTOMATION,
});

export const fetchAutomationSuccess = automation => ({
  type: FETCH_AUTOMATION_SUCCESS,
  payload: automation,
});

export const fetchAutomationError = error => ({
  type: FETCH_AUTOMATION_FAILURE,
  payload: error,
});
