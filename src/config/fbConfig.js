import firebase from "firebase/app";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyDDiUL2j27Wm9NliVNO3gEtgQNvnG8BuYc",
  authDomain: "reactnative-75f42.firebaseapp.com",
  databaseURL: "https://reactnative-75f42.firebaseio.com",
  projectId: "reactnative-75f42",
  storageBucket: "reactnative-75f42.appspot.com",
  messagingSenderId: "415483335659"
};
firebase.initializeApp(config);

export default firebase;
