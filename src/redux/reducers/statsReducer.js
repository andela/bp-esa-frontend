import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE,
} from '../constants';

export const initialState = {
  isLoading: false,
  data: {},
  error: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_STATS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
