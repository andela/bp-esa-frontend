import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE,
} from '../constants';

export const fetchStatsRequest = period => ({
  type: FETCH_STATS_REQUEST,
  period,
});

export const fetchStatsSuccess = payload => ({
  payload,
  type: FETCH_STATS_SUCCESS,
});

export const fetchStatsFailure = error => ({
  error,
  type: FETCH_STATS_FAILURE,
});
