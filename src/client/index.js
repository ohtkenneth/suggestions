import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './Components/reducers/reducers';

import VisibleApp from './Components/Containers/VisibleApp';

const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
);

console.log('initial state', store.getState());

ReactDOM.render(
  <Provider store={ store }>
    <VisibleApp />
  </Provider>,
   document.getElementById('app'));