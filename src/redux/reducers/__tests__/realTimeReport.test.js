import realTimeReportReducer from '../realTimeReport';
import { SET_REAL_TIME_DATA, RESET_REAL_TIME_DATA_SUCCESS } from '../../constants';
import sampleData from '../fixtures/fixtures';

describe('Real Time Report reducer', () => {
  const initialState = [];
  const updatedState = [{ ...sampleData }];
  const data = sampleData.data[0];

  it('should return initial state', () => {
    const res = realTimeReportReducer(undefined, { type: 'NOT_AN_ACTION' });
    expect(res).toEqual(initialState);
  });

  it('should update correct state for action type SET_REAL_TIME_DATA', () => {
    const action = {
      type: SET_REAL_TIME_DATA,
      payload: data,
    };
    const res = realTimeReportReducer(initialState, action);
    expect(res).toHaveLength(1);
    expect(res[0]).toMatchObject(data);
  });

  it('should reset state for action type RESET_REAL_TIME_DATA_SUCCESS', () => {
    const action = {
      type: RESET_REAL_TIME_DATA_SUCCESS,
    };
    const res = realTimeReportReducer(updatedState, action);
    expect(res).toEqual(initialState);
  });
});
