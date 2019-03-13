import configureStore from 'redux-mock-store';
import {
  FETCH_STATS_FAILURE,
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
} from '../../constants';
import {
  fetchStatsFailure,
  fetchStatsRequest,
  fetchStatsSuccess,
} from '../automationStats';
import { initialState } from '../../reducers/statsReducer';

const mockStore = configureStore();
const store = mockStore(initialState);

describe('Fetch automation stats', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should dispatch FETCH_STATS_REQUEST action', () => {
    const expectedAction = [
      {
        type: FETCH_STATS_REQUEST,
      },
    ];
    store.dispatch(fetchStatsRequest());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should dispatch FETCH_STATS_SUCCESS action', () => {
    const expectedAction = [
      {
        type: FETCH_STATS_SUCCESS,
        payload: [],
      },
    ];
    store.dispatch(fetchStatsSuccess([]));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should dispatch FETCH_STATS_FAILURE action', () => {
    const expectedAction = [
      {
        type: FETCH_STATS_FAILURE,
        error: {},
      },
    ];
    store.dispatch(fetchStatsFailure({}));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
