import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import App from './oldApp';
import Login from './Login';
import Signup from './Signup';
import './styles/Router.css';
import AuthPage from './AuthPage';

class Router extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.authenticate = this.authenticate.bind(this);
  }
  componentWillMount() {
    this.authenticate();
  }
  authenticate() {
    axios.get('/api/auth')
    .then(isAuthenticated => {
      if (isAuthenticated.data === true) {
        this.setState({
          isAuthenticated: true,
        });
      } else {
        this.setState({
          isAuthenticated: false,
        });
      }
    })
    .catch(err => {
      console.log('ERROR from auth router.js', err);
    })
  }
  render() {
    const isAuthenticated = this.state.isAuthenticated;
    
    if (!isAuthenticated) {
      return (
        // <BrowserRouter>
        // <div className="landing-page">
        //   <br/>
        //   <br/>
        //   <h1>Suggestions</h1>       
        //   <br/>
        //   <Route path="/login" render={ () => <Login authenticate={this.authenticate}/>}></Route>
        //   <Route path="/signup" render={ () => <Signup authenticate={this.authenticate}/>}></Route>
        //   <br/>
        //   <Link to="/login">Login</Link>
        //   <Link to="/signup">Signup</Link>
        // </div>
        // </BrowserRouter>
        <AuthPage/>
      )
    }
    return (
      <div>
        <App authenticate={ this.authenticate }/>
      </div>
    )
  }
}

export default Router;