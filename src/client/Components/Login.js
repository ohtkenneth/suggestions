import '@babel/polyfill';
import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log('login props', props);
    this.state = {
      email: '',
      password: '',
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    if (this.state.email !== '' && this.state.password !== '') {
      // dispatch action
      this.props.onLogin(this.state.email, this.state.password);
    } else {
      // enter email and password
      console.log('enter email and password');
    }
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-control md-8">
            <input type="text" className="form-control" placeholder="email" onChange={ (e) => this.setState({ email: e.target.value }) }/>
            <input type="text" className="form-control" placeholder="password" onChange={ (e) => this.setState({ password: e.target.value}) }/>
            <button type="button" className="btn btn-success" onClick={ this.onLogin }>Log in</button>
          </div>
        </form>
        {/* <button type="button" onClick={ () => axios.get('/api/auth/google') } >Google auth</button> */}
        <a href="/api/auth/google">Google Login</a>
      </div>
    )
  }
}

export default Login;