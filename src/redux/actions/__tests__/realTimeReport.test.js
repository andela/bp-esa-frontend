import {
  setRealTimeReport, fetchRealTimeReport, resetRealTimeReport, resetRealTimeReportSuccess,
} from '../realTimeReport';
import {
  SET_REAL_TIME_DATA, FETCH_REAL_TIME_DATA, RESET_REAL_TIME_DATA, RESET_REAL_TIME_DATA_SUCCESS,
} from '../../constants';

describe('Test realTimeData actions', () => {
  const data = {};
  const resultGenerator = (type, payload) => ({ type, payload });
  it('should return type SET_REAL_TIME_DATA', () => {
    const res = setRealTimeReport(data);
    expect(res).toMatchObject(resultGenerator(SET_REAL_TIME_DATA, data));
  });
  it('should return type FETCH_REAL_TIME_DATA', () => {
    const res = fetchRealTimeReport(data);
    expect(res).toMatchObject(resultGenerator(FETCH_REAL_TIME_DATA, data));
  });
  it('should return type RESET_REAL_TIME_DATA', () => {
    const res = resetRealTimeReport();
    expect(res).toMatchObject({ type: RESET_REAL_TIME_DATA });
  });
  it('should return type SET_REAL_TIME_DATA', () => {
    const res = resetRealTimeReportSuccess();
    expect(res).toMatchObject({ type: RESET_REAL_TIME_DATA_SUCCESS });
  });
});
