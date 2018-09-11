import axios from 'axios';

const user = {
  login(email, password) {
    const options = {
      url: '/api/auth',
      method: 'post',
      data: {
        email,
        password,
      }
    };
    return axios(options);
  }
}

export default user;