import firebase from "firebase";
import axios from "axios";

const URL = "http://hexagon.dynamicasm.com/api/";

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  TBURSA,
  LOGIN_STATUS_LOGIN,
  LOGIN_STATUS_LOGOFF
} from "./types";

// Forms

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
// Forms

// Auth
export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    // go tbursa
    axios
      .get(URL + "get_user.php?", {
        params: {
          DBDataEposta: email,
          DBDataSifre: password,
          DBAnaBranch: "hmtr",
          DBAnaLangKod: "tr"
        }
      })
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(user => loginUserSuccess(dispatch, user))
              .catch(err => loginUserFail(dispatch, err));
          });
      })
      .catch(error => {
        loginUserFail(dispatch, error);
      });
  };
};

const loginUserFail = (dispatch, err) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: err
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

export const loginStatusLogin = () => {
    return({
        type:LOGIN_STATUS_LOGIN
    })
}
export const loginStatusLogoff = () => {
    return({
        type:LOGIN_STATUS_LOGOFF
    })
}
// Auth
