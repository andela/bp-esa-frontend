import { combineReducers } from 'redux';
import automationReducer from './automationReducer';
import realTimeReportReducer from './realTimeReport';

/* istanbul ignore file */
export default combineReducers({
  automation: automationReducer,
  realTimeReport: realTimeReportReducer,
});
