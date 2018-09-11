import { connect } from 'react-redux';
import App from '../App';
import { login } from '../actions/actions';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin(email, password) {
      dispatch(login(email, password));
    } 
  };
}

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default VisibleApp;