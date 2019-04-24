import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_STATUS_LOGIN,
    LOGIN_STATUS_LOGOFF
  } from './types';
  
  const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    loginStatus:null
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EMAIL_CHANGED:
        return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
      case LOGIN_USER:
        return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload };
      case LOGIN_USER_FAIL:
        return { ...state, error: 'Authentication Failed.', password: '', loading: false };
      case LOGIN_STATUS_LOGIN:
        return {...state,loginStatus:true};
      case LOGIN_STATUS_LOGOFF:
        return {...state,loginStatus:false};
      default:
        return state;
    }
  };