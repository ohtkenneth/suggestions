import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { checkIsLoggedInDone, checkIsLoggedInFailure } from './Components/actions/checkIsLoggedIn';
import user from './utils/user';
import combinedReducers from './Components/reducers/combined';
import VisibleApp from './Components/Containers/VisibleApp';
import history from './utils/history';

const loggerMiddleware = createLogger();

const store = createStore(
  combinedReducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
);

// set inital state isLoggedIn right after creating store
user.checkLoggedIn()
  .then(response => {
    store.dispatch(checkIsLoggedInDone(response.data));
    response.data === true ? history.push('/') : void 0;
  })
  .catch(err => {
    store.dispatch(checkIsLoggedInFailure(err));
  });

ReactDOM.render(
  <Provider store={ store }>
    <VisibleApp />
  </Provider>,
   document.getElementById('app'));