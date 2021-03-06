import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import store from './redux/store';
import { unregister } from './serviceWorker';


/* istanbul ignore file */
ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
unregister();
