import { combineReducers } from 'redux';
import authReducer from './authReducer';
import yelpReducer from './yelpReducer';

const suggestionsApp = combineReducers({
  authReducer,
  yelpReducer,
});

export default suggestionsApp;