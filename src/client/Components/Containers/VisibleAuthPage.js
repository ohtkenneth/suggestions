import { connect } from 'react-redux';
import AuthPage from '../AuthPage';
import { login } from '../actions/actions';

const mapDispatchToProps = dispatch => {
  return {
    onLogin(email, password) {
      dispatch(login(email, password));
    } 
  };
}

const VisibleAuthPage = connect(
  mapDispatchToProps,
)(AuthPage);

export default VisibleAuthPage;