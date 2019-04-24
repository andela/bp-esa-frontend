import { SET_REAL_TIME_DATA, RESET_REAL_TIME_DATA_SUCCESS } from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REAL_TIME_DATA:
      return [...state, { ...payload }];
    case RESET_REAL_TIME_DATA_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
