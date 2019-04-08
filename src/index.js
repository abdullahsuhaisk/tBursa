import React, { Component } from "react";
import { Button, ThemeProvider } from "react-native-elements";

import firebase from "./config/fbConfig";
import LoginScreen from "./screen/LoginScreen";
// import ImagePicker from "./components/ImagePicker";

const theme = {
  Button: {
    raised: true
  }
};

export default class index extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <LoginScreen />
      </ThemeProvider>
    );
  }
}
