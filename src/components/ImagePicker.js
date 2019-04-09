import React from "react";
import { Image, View } from "react-native";
import { Button } from "./commons/Button";
import { ImagePicker, Camera, Permissions } from "expo";
import { Card, CardSection } from "./commons";

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
              <Button title="Save" onPress={() => console.log("pressed")} />
            </CardSection>
          ) : null}
        </Card>
      );
    }
  }

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
}
