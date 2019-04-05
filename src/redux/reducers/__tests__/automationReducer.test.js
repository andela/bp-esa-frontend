import automation from '../automationReducer';
import {
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_FAILURE,
  RETRY_AUTOMATION,
  RETRY_AUTOMATION_SUCCESS,
  RETRY_AUTOMATION_FAILURE,
} from '../../constants';

describe('automationReducer', () => {
  const initialState = {
    isLoading: false,
    data: [],
    error: {},
    retryingAutomation: false,
  };

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
    const expectedState = {
      isLoading: true,
      data: [],
      error: {},
      retryingAutomation: false,
    };
    expect(automation(initialState, action)).toEqual(expectedState);
  });


  it('should return the correct state for FETCH_AUTOMATION_FAILURE', () => {
    const action = { type: FETCH_AUTOMATION_FAILURE, payload: { error: {} } };
    const expectedState = {
      isLoading: false,
      data: [],
      error: { error: {} },
      retryingAutomation: false,
    };
    expect(automation(initialState, action)).toEqual(expectedState);
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
    const newState = {
      ...initialState,
      data: [
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
      ],
    };
    const action = {
      type: RETRY_AUTOMATION_SUCCESS,
      automationData: {
        id: 3678,
        fellowId: '7663fd7f-380e-4abd-b6af-4a8c74b9c914',
        fellowName: 'Emeka, Chinedu',
        partnerId: '-KXGyJcC1oimjQgFj184',
        partnerName: 'Floww Inc',
        type: 'onboarding',
      },
    };
    const expectedState = {
      isLoading: false,
      data: [
        {
          id: 3678,
          fellowId: '7663fd7f-380e-4abd-b6af-4a8c74b9c914',
          fellowName: 'Emeka, Chinedu',
          partnerId: '-KXGyJcC1oimjQgFj184',
          partnerName: 'Floww Inc',
          type: 'onboarding',
        }, {
          id: 3679,
          fellowId: '7663fd7f-380e-4abd-b6af-4a8c74b9c914',
          fellowName: 'Dakota, Schinner',
          partnerId: '-KXGyJcC1oimjQgFkjhk84',
          partnerName: 'DB Inc',
          type: 'onboarding',
        },
      ],
      error: {},
      retryingAutomation: false,
    };
    expect(automation(newState, action)).toEqual(expectedState);
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
