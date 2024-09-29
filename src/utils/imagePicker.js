import React, { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import { ButtonComponent } from "../components";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "./cloudinary"; // Make sure this points to your uploadImage function

const ImagePickerComponent = () => {
  const [imageUri, setImageUri] = useState(null);

  // Function to pick an image from the device
  const pickImage = async () => {
    // Ask for permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access media is required!");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3], // Optional cropping aspect ratio
      quality: 1, // Image quality
    });

    // If the user canceled the image picking, do nothing
    if (result.canceled) {
      return;
    }

    // Set the selected image URI
    setImageUri(result.assets[0].uri);
  };

  // Function to handle image upload
  const handleSubmit = async () => {
    try {
      await uploadImage(imageUri);
      Alert.alert("Image uploaded successfully!");
    } catch (error) {
      if (error.message.includes("token [expired]")) {
        // Retry logic: possibly re-fetch a new token and try again
        Alert.alert("Token expired, please try again.");
      } else {
        Alert.alert("Upload failed", error.message);
      }
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      {/* <Button title="Pick an Image" onPress={pickImage} /> */}
      <ButtonComponent title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}
      {/* <Button
        title="Upload Image"
        onPress={handleSubmit}
        disabled={!imageUri}
      /> */}
      <ButtonComponent
        title="Upload Image"
        onPress={handleSubmit}
        disabled={!imageUri}
      />
    </View>
  );
};

export default ImagePickerComponent;
