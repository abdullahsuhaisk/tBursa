import React, { Component } from "react";
import { Button, ThemeProvider } from "react-native-elements";
import { View } from "react-native";
import { connect } from "react-redux";
import firebase from "./config/fbConfig";
import LoginScreen from "./screen/LoginScreen";
import ImagePicker from "./components/ImagePicker";
import { Spinner } from "./components/commons/index";
import { loginStatusLogin, loginStatusLogoff } from "./redux/actions";

const theme = {
  Button: {
    raised: true
  }
};
class index extends Component {
  //  state = { loggedIn: null };
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.loginStatusLogin();
      } else {
        this.props.loginStatusLogoff();
      }
    });
  }
  renderContent() {
    switch (this.state.auth.loginStatus) {
      case true:
        return <ImagePicker />;
      case false:
        return <LoginScreen />;
      default:
        return <Spinner size="large" />;
    }
  }
  render() {
    console.log(this.props);
    console.log(this.state);

    return (
      <ThemeProvider theme={theme}>
        <View>{this.renderContent()}</View>
      </ThemeProvider>
    );
  }
}

function mapStateToProps({ state }) {
  const { auth } = state.auth;
  return auth;
}

export default connect(
  mapStateToProps,
  { loginStatusLogin, loginStatusLogoff }
)(index);
