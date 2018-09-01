import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import './styles/Router.css';

class Router extends React.Component { 
  constructor(props) {
    super(props);
    console.log('I am the index router')
    this.state = {
      isAuthenticated: false,
    };
    this.authenticate = this.authenticate.bind(this);
  }
  componentDidMount() {
    console.log('should auth now')
    this.authenticate();
  }
  authenticate() {
    axios.get('/authenticate')
    .then(isAuthenticated => {
      console.log('IS AUTH', isAuthenticated.data, typeof isAuthenticated.data)
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
  signout(cb) {
    console.log('sign out');
    axios.post('/signout')
    .then(response => {
      console.log(response);
      this.setState({
        isAuthenticated: false,
      });
    })
    .catch(err => console.log(err));
  }
  render() {
    const isAuthenticated = this.state.isAuthenticated;
    console.log('isAuthenticated from render', isAuthenticated);
    
    if (!isAuthenticated) {
      console.log('redirect to login');
      return (
        <BrowserRouter>
        <div className="landing-page">
          <br/>
          <br/>
          <h1>Suggestions</h1>       
          <div className="nav">
            <br/>
            <br/>
               
            {/* <Link to="/home">Home</Link> */}
          </div>
          <br/>
          <br/>
          {/* <Route path="/login" component={ Login } /> */}
          <Route path="/login" render={ () => <Login authenticate={this.authenticate}/>}></Route>
          <Route path="/signup" render={ () => <Signup authenticate={this.authenticate}/>}></Route>
          {/* <Route path="/signup" component={ Signup } />  */}
          <br/>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          {/* <Route path="/home" component= { App }/> */}
        </div>
        </BrowserRouter>
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