import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { ButtonComponent } from "../../components";
import { colors, spacing, typography } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileHomeScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.userInfo.user);
  const dispatch = useDispatch();

  const removeToken = async () => {
    await AsyncStorage.removeItem("authToken");
  };

  const handleLogoutOk = async () => {
    // Clear the user data from the async storage
    await AsyncStorage.removeItem("authToken");

    // Clear the user data from the redux store
    dispatch(setUser({ userinfo: null }));

    // Navigate to the Splash screen
    navigation.navigate("Auth");
  };

  console.log("userInfo", userInfo);
  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          handleLogoutOk();
        },
      },
    ]);
  };

  const navigateToEditScreen = () => {
    navigation.navigate("ProfileEditScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: userInfo?.profilePicture || "https://default-image-url.com",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{userInfo?.userName || "User Name"}</Text>
      <View style={styles.buttonContainer}>
        {/* <ButtonComponent
          title="Edit"
          onPress={navigateToEditScreen}
          variant="secondary"
          style={styles.editButton}
        /> */}
        <ButtonComponent
          title="Logout"
          onPress={handleLogout}
          variant="primary"
          style={styles.logoutButton}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background.default,
    padding: spacing.large,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.medium,
  },
  name: {
    fontSize: typography.heading2.fontSize,
    fontWeight: typography.heading2.fontWeight,
    color: colors.text.primary,
    marginBottom: spacing.mediumLarge,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: spacing.mediumLarge,
  },
  editButton: {
    flex: 1,
    marginRight: spacing.medium,
  },
  logoutButton: {
    flex: 1,
  },
};

export default ProfileHomeScreen;
