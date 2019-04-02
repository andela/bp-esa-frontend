import { combineReducers } from 'redux';
import automationReducer from './automationReducer';

/* istanbul ignore file */
export default combineReducers({
  firstReducer: () => 'my first root reducers',
  automationReducer,
});
