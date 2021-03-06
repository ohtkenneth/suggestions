import React, { Component } from 'react';
import { Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import history from '../utils/history';

import AuthPage from './auth/AuthPage';
import HomePage from './home/HomePage';
// This component ios HoC that prevents the user from accessing a route if he's not logged in
import PrivateRoute from './PrivateRoute';

import './App.css';

const App = (props) => {
  console.log(props);
  return (
    <Router history={ history }>
      <div className="App">
        in test app
        <Switch>
          {/* A user can't go to the HomePage if is not authenticated */}
          <PrivateRoute exact path="/" component={ HomePage } isLoggedIn={ props.isLoggedIn } />
          {/* <Route path="/auth" component={ AuthPage } /> */}
          <Route path='/auth' render={ () => <AuthPage /> }> </Route>
          {/* <Route path="/login" render={ () => <Login authenticate={this.authenticate}/>}></Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;