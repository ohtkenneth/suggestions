import { combineReducers } from 'redux';

const initialAuthState = {
  isLoggedIn: false,
}

function auth(state = initialAuthState, action) {
  if (action.type === 'LOGIN_SUCCESS') {
    return Object.assign({}, state, {
      isLoggedIn: true,
    });
  } else if (action.type === 'LOGIN') {
    return Object.assign({}, state, {
      isLoggedIn: true,
    });
  } else if (action.type === 'LOGOUT') {
    return Object.assign({}, state, {
      isLoggedIn: false,
    });
  } else {
    return state;
  }
};

const suggestionsApp = combineReducers({
  auth
});

export default suggestionsApp;