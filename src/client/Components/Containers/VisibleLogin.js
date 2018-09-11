import { connect } from 'react-redux';
import Login from '../Login';
import { localLogin } from '../actions/localAuthActions';
import { withRouter } from 'react-router'

const mapDispatchToProps = dispatch => {
  return {
    onLocalLogin: (email, password) => {
      dispatch(localLogin(email, password));
    } 
  };
}

const VisibleLogin = connect(
  null,
  mapDispatchToProps,
)(Login);

export default withRouter(VisibleLogin);