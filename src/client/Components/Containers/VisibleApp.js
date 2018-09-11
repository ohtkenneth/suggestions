import { connect } from 'react-redux';
import App from '../App';
import { localLogin } from '../actions/localAuthActions';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
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