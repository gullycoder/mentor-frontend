import { Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { getQuestions, setUser, getQuestionFilterOption } from "../../redux";
import ImagePickerComponent from "../../utils/imagePicker";

const ProfileEditScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const removeToken = async () => {
    await AsyncStorage.removeItem("authToken");
  };

  const handleLogout = async () => {
    // Clear the user data from the async storage
    await AsyncStorage.removeItem("authToken");

    // Clear the user data from the redux store
    dispatch(setUser({ userinfo: null }));

    // Navigate to the Splash screen
    navigation.navigate("Auth");
  };
  handelFetchQuestions = () => {
    const query = {
      limit: 10,
      page: 1,
    };
    dispatch(getQuestions(query));
  };

  const handelFetchFilterOptions = () => {
    console.log("fetching filter options");
    dispatch(getQuestionFilterOption());
  };

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>ProfileEditScreen</Text> */}
      <ButtonComponent title="Logout" onPress={handleLogout} />
      <ButtonComponent title="Fetch Questions" onPress={handelFetchQuestions} />
      <ButtonComponent
        title="fetch filter options"
        onPress={handelFetchFilterOptions}
      />
      <ButtonComponent title="Remove Token" onPress={removeToken} />
      <ImagePickerComponent />
    </View>
  );
};

export default ProfileEditScreen;
