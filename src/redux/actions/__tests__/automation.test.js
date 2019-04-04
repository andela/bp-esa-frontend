import configureStore from 'redux-mock-store';
import {
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_FAILURE,
} from '../../constants';
import { fetchAutomation, fetchAutomationSuccess, fetchAutomationError } from '../automation';

const mockStore = configureStore();
const store = mockStore();

describe('Fetch automation', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should dispatch the correct action and payload for FETCH_AUTOMATION', () => {
    const expectedAction = [
      {
        type: FETCH_AUTOMATION,
      },
    ];
    store.dispatch(fetchAutomation());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should dispatch the correct action and payload for FETCH_AUTOMATION_SUCCESS', () => {
    const expectedAction = [{
      type: FETCH_AUTOMATION_SUCCESS,
      payload: [],
    }];
    const data = [];
    store.dispatch(fetchAutomationSuccess(data));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should dispatch the correct action and payload for FETCH_AUTOMATION_FAILURE', () => {
    const expectedAction = [{
      type: FETCH_AUTOMATION_FAILURE,
      payload: {},
    }];
    const error = {};
    store.dispatch(fetchAutomationError(error));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
