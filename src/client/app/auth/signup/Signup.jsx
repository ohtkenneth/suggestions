import React from 'react';
import axios from 'axios';

const Signup = (props) => {
  let email = '';
  let password = '';
  const onSignup = () => {
    if (email !== '' && password !== '') {
      axios.post('/signup', { email, password })
      .then(results => {
        console.log(results);
        if (results.data === 'Email taken') {
          // tell user invalid credentials
          alert('Email taken!');
        } else {
          // redirect to home page
          props.authenticate();
        }
      })
      .catch(err => console.log('SIGNUP ERROR', err));
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
          <button type="button" className="btn btn-primary" onClick={ onSignup }>Sign up</button>
        </div>
      </form>
    </div>
  )
};

export default Signup;