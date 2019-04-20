import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
// permission
// photo

export default combineReducers({
  auth: AuthReducer,
});