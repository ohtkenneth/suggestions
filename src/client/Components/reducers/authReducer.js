const initialAuthState = {
  isLoggedIn: false,
}

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case 'CHECK_IS_LOGGED_IN_DONE':
      return Object.assign({}, state, {
        isLoggedIn: action.payload
      });
      break;
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isLoggedIn: true,
      });
      break;
    case 'LOGOUT':
      return Object.assign({}, state, {
        isLoggedIn: false,
      });
      break;
    default:
      return state;
  }
};

export default authReducer;