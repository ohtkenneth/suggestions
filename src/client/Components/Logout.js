import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Logout extends React.Component {
  componentWillMount() {
    axios.post('/logout')
    .then(() => {
      this.props.authenticate()
    })
    .catch(err => console.log(err));
  }
  render() {
    return (
      <Redirect to="/" />
    );
  }
}

export default Logout;