import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';

import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
