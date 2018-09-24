import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import Login from './Login';
import VisibleLogin from './login/dux/VisibleLogin';
import Signup from './signup/Signup';

const AuthPage = (props) => {
  return (
    <Router>
      <div className="landing-page">
        <h1>Suggestions</h1>       
  
        <Route path="/auth/login" render={ (props) => <VisibleLogin /> }></Route>
        <Route path="/auth/signup" render={ () => <Signup /> }></Route>

        <Link to="/auth/login">Login</Link>
        <Link to="/auth/signup">Signup</Link>
      </div>
    </Router>
  )
}
     
export default AuthPage;