import React from 'react';
import axios from 'axios';

const Login = () => {
  let email = '';
  let password = '';

  const onLogin = () => {
    if (email !== '' && password !== '') {
      axios.post('/login', { email, password })
      .then(results => {
        console.log(results);
        if (results.data === 'invalid') {
          // tell user invalid credentials
        } else {
          // redirect to home page
        }
      })
      .catch(err => console.log('LOGIN ERROR', err));
    } else {
      // enter email and password
      console.log('enter email and password');
    }
  };

  return (
    <div>
      <form>
        <div className="form-control md-8">
          <input type="text" className="form-control" placeholder="email" onChange={ (e) => email = e.target.value }/>
          <input type="text" className="form-control" placeholder="password" onChange={ (e) => password = e.target.value }/>
          <button type="button" className="btn btn-success" onClick={ onLogin }>Log in</button>
        </div>
      </form>
    </div>
  )
};

export default Login;