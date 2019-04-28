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
    console.log(this.props)
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
        <View>{this.renderContent()}</View>
      </ThemeProvider>
    );
  }
}

function mapStateToProps( state ) {
  const { auth } = state;
  return auth;
}

export default connect(
  mapStateToProps,
  { loginStatusLogin, loginStatusLogoff }
)(index);
