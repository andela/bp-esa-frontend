import {
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION_FAILURE,
  RETRY_AUTOMATION,
  RETRY_AUTOMATION_SUCCESS,
  RETRY_AUTOMATION_FAILURE,
} from '../constants';

let dataUpdate;
export const initialState = {
  isLoading: false,
  data: [],
  error: {},
  pagination: {},
  retryingAutomation: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTOMATION:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_AUTOMATION_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        pagination: action.payload.pagination,
      };

    case FETCH_AUTOMATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case RETRY_AUTOMATION:
      return { ...state, retryingAutomation: true };
    case RETRY_AUTOMATION_SUCCESS:
      dataUpdate = state.data.map((item) => {
        if (item.id === action.automationData.id) { return action.automationData; }
        return item;
      });
      return { ...state, retryingAutomation: false, data: [...dataUpdate] };
    case RETRY_AUTOMATION_FAILURE:
      return { ...state, retryingAutomation: false, error: action.payload };
    default:
      return state;
  }
};
