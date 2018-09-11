import user from '../../utils/user';
import history from '../../utils/history';

function googleLoginStart(email) {
  return {
    type: 'GOOGE_LOGIN_START',
    email,
  };
}
function googleLoginFailure(error) {
  return {
    type: 'GOOGLE_LOGIN_FAILURE',
    error
  };
}
function googleLoginSuccess(user) {
  return {
    type: 'GOOGLE_LOGIN_SUCCESS',
    user
  };
}

export function googleLogin() {
  return dispatch => {
    // tell that we are logging in
    dispatch(googleLoginStart());
    
    user.googleLogin()
      // successful login
      .then(user => {
        // dispatch to reducer to set isloggedIn
        dispatch(googleLoginSuccess(user));

        console.log(history);
        history.push('/');
      })
      .catch(err => {
        // login failed
        dispatch(googleLoginFailure(err.toString()));
      });
  }
}