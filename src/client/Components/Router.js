import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import Login from './Login';
import Signup from './Signup';

const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    axios.get('/authenticate')
    .then(isAuthenticated => {
      console.log(isAuthenticated);
      this.isAuthenticated = isAuthenticated;
    })
    .catch(err => {
      console.log('ERROR from auth router.js', err);
    })
  },
  signout(cb) {
    this.isAuthenticated = false;
    console.log('sign out');
    axios.post('/authenticate')
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  }
}

const Authenticate = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <Route path="/login" component={ Login } />
        <Route path="/signup" component={ Signup } />
        {/* <PrivateRoute path="/home" component={App}/> */}
        <button onClick={ auth.signout() }></button>
      </div>
    </Router>
  )
};

// const Private = () => {
//   return (
    
//   )
// }

export default Authenticate;
