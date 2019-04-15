import reducer, { initialState } from '../statsReducer';
import {
  FETCH_STATS_FAILURE,
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
} from '../../constants';

describe('Stats Reducer', () => {
  let newState;
  beforeEach(() => {
    newState = {
      isLoading: false,
      data: {},
      error: {},
    };
  });

  it('should handle FETCH_STATS_REQUEST action', () => {
    const expectedAction = {
      type: FETCH_STATS_REQUEST,
    };
    newState = {
      ...newState,
      isLoading: true,
    };

    expect(reducer(initialState, expectedAction)).toEqual(newState);
  });

  it('should handle FETCH_STATS_SUCCESS action', () => {
    const expectedAction = {
      type: FETCH_STATS_SUCCESS,
      payload: {},
    };

    expect(reducer(initialState, expectedAction)).toEqual(newState);
  });

  it('should handle FETCH_STATS_FAILURE action', () => {
    const expectedAction = {
      type: FETCH_STATS_FAILURE,
      error: {},
    };

    expect(reducer(initialState, expectedAction)).toEqual(newState);
  });
});
