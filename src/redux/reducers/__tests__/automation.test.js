import automation from '../automationReducer';
import { FETCH_AUTOMATION, FETCH_AUTOMATION_FAILURE } from '../../constants';
import { fetchAutomationSuccess } from '../../actions/automation';
import automationData from '../fixtures/fixtures';

describe('automationReducer', () => {
  const initialState = {
    isLoading: false,
    data: [],
    error: {},
    pagination: {},
  };

  it('should return initial state', () => {
    const action = { type: 'dummyAction' };
    const expectedState = {
      isLoading: false,
      data: [],
      error: {},
      pagination: {},
    };
    expect(automation(undefined, action)).toEqual(expectedState);
  });

  it('should return the correct state for FETCH_AUTOMATION_SUCCESS', () => {
    const automationSuccessAction = fetchAutomationSuccess(automationData);
    const newAutomationState = automation(initialState, automationSuccessAction);

    expect(newAutomationState.data.length).toEqual(2);
    expect(newAutomationState.pagination.currentPage).toEqual(1);
  });

  it('should return the correct state for FETCH_AUTOMATION ', () => {
    const action = { type: FETCH_AUTOMATION };
    const expectedState = {
      isLoading: true,
      data: [],
      error: {},
      pagination: {},
    };
    expect(automation(initialState, action)).toEqual(expectedState);
  });


  it('should return the correct state for FETCH_AUTOMATION_FAILURE', () => {
    const action = { type: FETCH_AUTOMATION_FAILURE, payload: { error: {} } };
    const expectedState = {
      isLoading: false,
      data: [],
      error: { error: {} },
      pagination: {},
    };
    expect(automation(initialState, action)).toEqual(expectedState);
  });
});
