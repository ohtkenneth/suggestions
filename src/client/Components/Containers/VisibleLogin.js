import { connect } from 'react-redux';
import Login from '../Login';
import { login } from '../actions/actions';
import { withRouter } from 'react-router'

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => {
      dispatch(login(email, password));
    } 
  };
}

const VisibleLogin = connect(
  null,
  mapDispatchToProps,
)(Login);

export default withRouter(VisibleLogin);