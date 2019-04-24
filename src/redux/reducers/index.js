import { combineReducers } from 'redux';
import automationReducer from './automationReducer';
import stats from './statsReducer';
import realTimeReportReducer from './realTimeReport';

/* istanbul ignore file */
export default combineReducers({
  stats,
  automation: automationReducer,
  realTimeReport: realTimeReportReducer,
});
