import {
  FETCH_AUTOMATION_REQUEST,
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION_FAILURE,
} from '../constants';

export const fetchAutomation = () => ({
  type: FETCH_AUTOMATION_REQUEST,
});

export const fetchAutomationSuccess = automation => ({
  type: FETCH_AUTOMATION_SUCCESS,
  data: automation,
});

export const fetchAutomationFailure = error => ({
  type: FETCH_AUTOMATION_FAILURE,
  data: error,
});
