import { combineReducers } from 'redux';
import authReducer from '../auth/ducks/authReducer';
import yelpReducer from './yelpReducer';

const suggestionsApp = combineReducers({
  authReducer,
  yelpReducer,
});

export default suggestionsApp;