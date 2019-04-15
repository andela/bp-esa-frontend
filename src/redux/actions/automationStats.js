import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE,
} from '../constants';

export const fetchStatsRequest = () => ({
  type: FETCH_STATS_REQUEST,
});

export const fetchStatsSuccess = payload => ({
  payload,
  type: FETCH_STATS_SUCCESS,
});

export const fetchStatsFailure = error => ({
  error,
  type: FETCH_STATS_FAILURE,
});
