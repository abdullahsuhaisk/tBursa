import React from "react";
import { Image, View } from "react-native";
import { Button } from "./commons/Button";
import { ImagePicker, Camera, Permissions } from "expo";
import { Card, CardSection } from "./commons";
import firebase from 'firebase';

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
    }
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  saveImage() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      var { name, email, photoUrl, uid, emailVerified } = user;
    }
    console.log(user);

    var storageRef = firebase.storage().ref(uid);
    // Create a reference to 'mountains.jpg'
    var mountainsRef = storageRef.child(name);
    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child("images/mountains.jpg");
    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name; // true
    mountainsRef.fullPath === mountainImagesRef.fullPath; // false
  }
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
              <Button title="Save" onPress={() => this.saveImage()} />
            </CardSection>
          ) : null}
        </Card>
      );
    }
  }
}
