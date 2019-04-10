import React, { Component } from "react";
import { Button, ThemeProvider } from "react-native-elements";
import {View} from 'react-native';
import firebase from "./config/fbConfig";
import LoginScreen from "./screen/LoginScreen";
import ImagePicker from "./components/ImagePicker";
import { Spinner, Header } from "./components/commons/index";

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
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <ImagePicker />;
      case false:
        return <LoginScreen />;
      default:
        return <Spinner size="large" />;
    }
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <View>
          <Header headerText="Authentication" />
          {this.renderContent()}
        </View>
      </ThemeProvider>
    );
  }
}
