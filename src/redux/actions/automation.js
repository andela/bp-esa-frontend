import {
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION_FAILURE,
} from '../constants';

export const fetchAutomation = (page, limit) => ({
  type: FETCH_AUTOMATION,
  page,
  limit,
});

export const fetchAutomationSuccess = automation => ({
  type: FETCH_AUTOMATION_SUCCESS,
  payload: automation,
});

export const fetchAutomationError = error => ({
  type: FETCH_AUTOMATION_FAILURE,
  payload: error,
});
