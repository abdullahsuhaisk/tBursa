import React from "react";
import { Image, View, Alert } from "react-native";
import { Button } from "./commons/Button";
import { ImagePicker, Camera, Permissions } from "expo";
import { Card, CardSection } from "./commons";
import firebase from "firebase";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    cameraRollPermission: null
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ cameraRollPermission: result.status === "granted" });
  }
  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    console.log(pickerResult);

    if (!pickerResult.cancelled) {
      this.setState({ image: pickerResult.uri });
      this.uploadImage(pickerResult.uri)
        .then(() => Alert.alert("Resim eklendi"))
        .catch(error => Alert.alert(error));
    }
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.uploadImage(result.uri)
        .then(() => Alert.alert("Resim eklendi"))
        .catch(error => Alert.alert(error));
    }
  };

  uploadImage = async (uri) => {
    var user = firebase.auth().currentUser;
    if (user != null) {
      var { uid } = user;
    }
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    console.log(blob);
    var ref = firebase
      .storage()
      .ref(`${uid}`)
      .child("images/" + `${uid}`);
    return ref.put(blob,{ contentType : 'image/png' });
  };

  render() {
    let { image, hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Card>
          <CardSection>
            <Button
              title="Pick an image from camera roll"
              onPress={this._pickImage}
            />
          </CardSection>
          <CardSection>
            <Button title="Take a phote" onPress={this._takePhoto} />
          </CardSection>
          {image && (
            <CardSection>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
                onPress={() => console.log("pressed")}
              />
            </CardSection>
          )}
          {image ? (
            <CardSection>
              <Button title="Save" onPress={() => firebase.auth().signOut()} />
            </CardSection>
          ) : null}
        </Card>
      );
    }
  }
}
