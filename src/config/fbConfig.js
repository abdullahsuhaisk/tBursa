import firebase from "firebase/app";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyDXgrJkwtc5UFMIMFeiJklss8mI9CYN9tU",
  authDomain: "fleet-fortress-236420.firebaseapp.com",
  databaseURL: "https://fleet-fortress-236420.firebaseio.com",
  projectId: "fleet-fortress-236420",
  storageBucket: "fleet-fortress-236420.appspot.com",
  messagingSenderId: "134976522313"
};
firebase.initializeApp(config);

export default firebase;
