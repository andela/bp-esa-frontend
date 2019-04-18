import configureStore from 'redux-mock-store';
import {
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_FAILURE,
  RETRY_AUTOMATION,
  RETRY_AUTOMATION_SUCCESS,
  RETRY_AUTOMATION_FAILURE,
} from '../../constants';
import {
  fetchAutomation,
  fetchAutomationSuccess,
  fetchAutomationError,
  retryAutomation,
  retryAutomationSuccess,
  retryAutomationFailure,
} from '../automationActions';

const mockStore = configureStore();
const store = mockStore();

describe('Automations Actions', () => {
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

  describe('Retry Automation', () => {
    const automationId = 3014;
    beforeEach(() => {
      store.clearActions();
    });

    const genTestCase = ({
      title, typeValue, payloadType, payload, error, dispatchMethod,
    }) => (it(title, () => {
      const expectedAction = [{
        type: typeValue,
        [payloadType]: payload || error,
      }];
      store.dispatch(dispatchMethod);
      expect(store.getActions()).toEqual(expectedAction);
    }));

    const testValues = [
      {
        title: 'should dispatch the action for RETRY_AUTOMATION_FAILURE',
        typeValue: RETRY_AUTOMATION_FAILURE,
        payloadType: 'error',
        error: {},
        dispatchValue: {},
        dispatchMethod: retryAutomationFailure({}),
      },
      {
        title: 'should dispatch the action for RETRY_AUTOMATION',
        typeValue: RETRY_AUTOMATION,
        payloadType: 'automationId',
        payload: automationId,
        dispatchValue: {},
        dispatchMethod: retryAutomation(automationId),
      },
      {
        title: 'should dispatch the action for RETRY_AUTOMATION_SUCCESS',
        typeValue: RETRY_AUTOMATION_SUCCESS,
        payloadType: 'automationData',
        payload: {},
        dispatchValue: {},
        dispatchMethod: retryAutomationSuccess({}),
      },
    ];

    testValues.map(value => genTestCase(value));
  });
});
