import '@babel/polyfill';
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  // console.log('from privateroute', isAuthenticated);
  console.log('from private route', isLoggedIn);

  return (
    <Route { ...rest } render={ props => (
      // authenticate
      isLoggedIn === true ? (
        // return home page
        <Component { ...props } />
      ) : (
        // auth failed; redirect to login
        <Redirect 
          to={{
            pathname: 'auth',
            state: { from: props.location }
          }}
        />
      )
    )} />
  )
}

export default PrivateRoute;