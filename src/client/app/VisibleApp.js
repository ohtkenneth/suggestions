import { connect } from 'react-redux';
import { localLogin } from './auth/login/ducks/localAuthActions';
import App from './App.jsx';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin(email, password) {
      dispatch(localLogin(email, password));
    } 
  };
}

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default VisibleApp;