import {
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION_FAILURE,
  RETRY_AUTOMATION,
  RETRY_AUTOMATION_SUCCESS,
  RETRY_AUTOMATION_FAILURE,
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


export const retryAutomation = automationId => ({
  type: RETRY_AUTOMATION,
  automationId,
});

export const retryAutomationSuccess = automationData => ({
  type: RETRY_AUTOMATION_SUCCESS,
  automationData,
});

export const retryAutomationFailure = error => ({
  type: RETRY_AUTOMATION_FAILURE,
  error,
});
