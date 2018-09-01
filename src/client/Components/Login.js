import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      email: '',
      password: '',
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin({ authenticate }) {
    if (this.state.email !== '' && this.state.password !== '') {
      axios.post('/login', { email: this.state.email , password: this.state.password })
      .then(results => {
        console.log(results);
        if (results.data === 'invalid') {
          // tell user invalid credentials
          alert('Wrong username or password');
        } else {
          // log user in
          console.log(results);
          this.setState({
            isAuthenticated: true,
          });
        } 
      })
      .catch(err => console.log('LOGIN ERROR', err));
    } else {
      // enter email and password
      console.log('enter email and password');
    }
  }

  render() {
    const isAuthenticated = this.state.isAuthenticated;
    return (
      <div>
        <form>
          <div className="form-control md-8">
            <input type="text" className="form-control" placeholder="email" onChange={ (e) => this.setState({ email: e.target.value }) }/>
            <input type="text" className="form-control" placeholder="password" onChange={ (e) => this.setState({ password: e.target.value}) }/>
            <button type="button" className="btn btn-success" onClick={ this.onLogin }>Log in</button>
          </div>
        </form>
      </div>
    )
  }
}


// const Login = () => {
//   let email = '';
//   let password = '';

//   const onLogin = ({ authenticate }) => {
//     if (email !== '' && password !== '') {
//       axios.post('/login', { email, password })
//       .then(results => {
//         console.log(results);
//         if (results.data === 'invalid') {
//           // tell user invalid credentials
//         } else {
//           // log user in
//         }
//       })
//       .catch(err => console.log('LOGIN ERROR', err));
//     } else {
//       // enter email and password
//       console.log('enter email and password');
//     }
//   };

//   return (
//     <div>
//       <form>
//         <div className="form-control md-8">
//           <input type="text" className="form-control" placeholder="email" onChange={ (e) => email = e.target.value }/>
//           <input type="text" className="form-control" placeholder="password" onChange={ (e) => password = e.target.value }/>
//           <button type="button" className="btn btn-success" onClick={ onLogin }>Log in</button>
//         </div>
//       </form>
//     </div>
//   )
// };

export default Login;