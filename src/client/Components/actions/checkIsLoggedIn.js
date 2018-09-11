import user from '../../utils/user';

function checkIsLoggedInStart(email) {
  return {
    type: 'CHECK_IS_LOGGED_IN_START'
  };
}
export function checkIsLoggedInFailure(error) {
  return {
    type: 'CHECK_IS_LOGGED_IN_FAILURE',
    error
  };
}
export function checkIsLoggedInDone(response) {
  return {
    type: 'CHECK_IS_LOGGED_IN_DONE',
    payload: response,
  };
}

// export function checkIsLoggedIn() {
//   return dispatch => {
//     user.checkIsLoggedIn()
//       .then(response => {
//         console.log(response);
//         dispatch(checkIsLoggedInDone(response));
//       })
//       .catch(err => {
//         console.log(err);
//         dispatch(checkIsLoggedInFailure(err));
//       })
//   }
// }