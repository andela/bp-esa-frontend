import automation, { initialState } from '../automationReducer';
import {
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_FAILURE,
  RETRY_AUTOMATION,
  RETRY_AUTOMATION_SUCCESS,
  RETRY_AUTOMATION_FAILURE,
} from '../../constants';

const data = [
  {
    id: 3678,
    fellowId: '9UUOIIU-380e-4abd-JKHIYO-8790JOU04KK9',
    fellowName: 'Emeka, Samuel',
    partnerId: '-KXGyJcC1oimjQgFj184',
    partnerName: 'Moore Inc',
    type: 'offboarding',
  }, {
    id: 3679,
    fellowId: '7663fd7f-380e-4abd-b6af-4a8c74b9c914',
    fellowName: 'Dakota, Schinner',
    partnerId: '-KXGyJcC1oimjQgFkjhk84',
    partnerName: 'DB Inc',
    type: 'onboarding',
  },
];

describe('automationReducer', () => {
  it('should return initial state', () => {
    expect(automation(undefined, {})).toEqual(initialState);
  });

  it('should return the correct state for FETCH_AUTOMATION_SUCCESS', () => {
    const action = { type: FETCH_AUTOMATION_SUCCESS, payload: { data: [] } };
    const expectedState = {
      isLoading: false,
      data: [],
      error: {},
      retryingAutomation: false,
    };
    expect(automation(initialState, action)).toEqual(expectedState);
  });

  it('should return the correct state for FETCH_AUTOMATION ', () => {
    const action = { type: FETCH_AUTOMATION };
    expect(automation(initialState, action)).toEqual({ ...initialState, isLoading: true });
  });


  it('should return the correct state for FETCH_AUTOMATION_FAILURE', () => {
    const action = { type: FETCH_AUTOMATION_FAILURE, payload: { error: {} } };
    expect(automation(initialState, action)).toEqual({ ...initialState, error: { error: {} } });
  });

  it('should return the correct state for RETRY_AUTOMATION ', () => {
    const action = { type: RETRY_AUTOMATION };
    const expectedState = {
      ...initialState,
      retryingAutomation: true,
    };
    expect(automation(initialState, action)).toEqual(expectedState);
  });

  it('should return the correct state for RETRY_AUTOMATION_SUCCESS', () => {
    const automationData = {
      id: 3678,
      fellowId: '7663fd7f-380e-4abd-b6af-4a8c74b9c914',
      fellowName: 'Emeka, Chinedu',
      partnerId: '-KXGyJcC1oimjQgFj184',
      partnerName: 'Floww Inc',
      type: 'onboarding',
    };
    const newState = {
      ...initialState,
      data,
    };
    const action = {
      type: RETRY_AUTOMATION_SUCCESS,
      automationData,
    };
    const newData = [automationData, data[data.length - 1]];
    expect(automation(newState, action)).toEqual({
      ...initialState,
      data: newData,
    });
  });

  it('should return the correct state for RETRY_AUTOMATION_FAILURE', () => {
    const action = {
      type: RETRY_AUTOMATION_FAILURE,
      payload: { error: {} },
    };
    const expectedState = {
      ...initialState,
      error: { error: {} },
    };
    expect(automation(initialState, action)).toEqual(expectedState);
  });
});
