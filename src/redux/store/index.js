/* istanbul ignore file */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from '../middleware';
import rootReducers from '../reducers';

const sagaMiddleware = createSagaMiddleware();
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducers, middleware);
sagaMiddleware.run(rootSaga);

export default store;
