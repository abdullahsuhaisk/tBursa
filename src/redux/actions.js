import firebase from "firebase";
import axios from "axios";

const URL = "http://hexagon.dynamicasm.com/api/";
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  TBURSA
} from "./types";

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
        console.log(error);
      });
    // go firebase
  };
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};
