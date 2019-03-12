import automation from '../automationReducer';
import { FETCH_AUTOMATION_SUCCESS, FETCH_AUTOMATION, FETCH_AUTOMATION_FAILURE } from '../../constants';

describe('automationReducer', () => {
  const initialState = {
    isLoading: false,
    data: [],
    error: {},
  };

  it('should return initial state', () => {
    const action = { type: 'dummyAction' };
    const expectedState = {
      isLoading: false,
      data: [],
      error: {},
    };
    expect(automation(undefined, action)).toEqual(expectedState);
  });

  it('should return the correct state for FETCH_AUTOMATION_SUCCESS', () => {
    const action = { type: FETCH_AUTOMATION_SUCCESS, payload: { data: [] } };
    const expectedState = {
      isLoading: false,
      data: [],
      error: {},
    };
    expect(automation(initialState, action)).toEqual(expectedState);
  });

  it('should return the correct state for FETCH_AUTOMATION ', () => {
    const action = { type: FETCH_AUTOMATION };
    const expectedState = {
      isLoading: true,
      data: [],
      error: {},
    };
    expect(automation(initialState, action)).toEqual(expectedState);
  });


  it('should return the correct state for FETCH_AUTOMATION_FAILURE', () => {
    const action = { type: FETCH_AUTOMATION_FAILURE, payload: { error: {} } };
    const expectedState = {
      isLoading: false,
      data: [],
      error: { error: {} },
    };
    expect(automation(initialState, action)).toEqual(expectedState);
  });
});
