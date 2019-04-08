import React from "react";
import { Button, Image, View } from "react-native";
import { ImagePicker, Camera, Permissions } from "expo";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    cameraRollPermission:null
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    const  result  = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ cameraRollPermission: result.status === "granted" });

  }

  render() {
    let { image, hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
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
