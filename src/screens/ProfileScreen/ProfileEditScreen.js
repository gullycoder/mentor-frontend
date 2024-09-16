import { Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const ProfileEditScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Clear the user data from the async storage
    await AsyncStorage.removeItem("authToken");

    // Clear the user data from the redux store
    dispatch(setUser({ userinfo: null }));

    // Navigate to the Splash screen
    navigation.navigate("Auth");
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
    </View>
  );
};

export default ProfileEditScreen;
