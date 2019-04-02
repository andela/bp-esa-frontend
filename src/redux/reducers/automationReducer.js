import {
  FETCH_AUTOMATION_REQUEST,
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION_FAILURE,
} from '../constants';

const initialState = {
  isLoading: false,
  data: [],
  error: {},
};

const automationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTOMATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_AUTOMATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data.data,
      };
    case FETCH_AUTOMATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.data.error,
      };
    default:
      return { ...state };
  }
};

export default automationReducer;
