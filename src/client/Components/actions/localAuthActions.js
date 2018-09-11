import user from '../../utils/user';
import history from '../../utils/history';

function loginStart(email) {
  return {
    type: 'LOGIN_START',
    email,
  };
}
function loginFailure(error) {
  return {
    type: 'LOGIN_FAILURE',
    error
  };
}
function loginSuccess(user) {
  return {
    type: 'LOGIN_SUCCESS',
    user
  };
}
export function localLogin(email, password) {
  return dispatch => {
    // tell that we are logging in
    dispatch(loginStart({ email }));
    
    user.localLogin(email, password)
      // successful login
      .then(user => {
        // dispatch to reducer to set isloggedIn
        dispatch(loginSuccess(user));

        console.log(history);
        history.push('/');
      })
      .catch(err => {
        // login failed
        dispatch(loginFailure(err.toString()));
      });
  }
}