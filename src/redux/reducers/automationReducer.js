import {
  FETCH_AUTOMATION,
  FETCH_AUTOMATION_SUCCESS,
  FETCH_AUTOMATION_FAILURE,
} from '../constants';

const initialState = {
  isLoading: false,
  data: [],
  error: {},

};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTOMATION:
      return { ...state, isLoading: true };
    case FETCH_AUTOMATION_SUCCESS:
      return { ...state, data: action.payload.data, isLoading: false };
    case FETCH_AUTOMATION_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
