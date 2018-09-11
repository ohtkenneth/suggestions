import axios from 'axios';

const user = {
  localLogin(email, password) {
    const options = {
      url: '/api/auth',
      method: 'post',
      data: {
        email,
        password,
      }
    };
    return axios(options);
  },
  googleLogin() {
    const options = { 
      url: '/api/auth/google',
      method: 'get',
    };
    return axios(options);
  },
  checkLoggedIn() {
    const options = {
      url: '/api/auth',
      method: 'get',
    };
    return axios(options);
  }
}

export default user;