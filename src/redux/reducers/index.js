import { combineReducers } from 'redux';
import automationReducer from './automationReducer';
import stats from './statsReducer';

/* istanbul ignore file */
export default combineReducers({
  stats,
  automation: automationReducer,
});
