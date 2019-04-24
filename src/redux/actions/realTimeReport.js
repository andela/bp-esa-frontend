import {
  SET_REAL_TIME_DATA, FETCH_REAL_TIME_DATA, RESET_REAL_TIME_DATA_SUCCESS, RESET_REAL_TIME_DATA,
} from '../constants';

export const setRealTimeReport = data => ({
  type: SET_REAL_TIME_DATA,
  payload: data,
});

export const fetchRealTimeReport = data => ({
  type: FETCH_REAL_TIME_DATA,
  payload: data,
});

export const resetRealTimeReport = () => ({
  type: RESET_REAL_TIME_DATA,
});

export const resetRealTimeReportSuccess = () => ({
  type: RESET_REAL_TIME_DATA_SUCCESS,
});
