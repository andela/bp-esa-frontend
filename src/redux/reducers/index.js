import { combineReducers } from 'redux';
import automationReducer from './automationReducer';

/* istanbul ignore file */
export default combineReducers({
  automation: automationReducer,
});
