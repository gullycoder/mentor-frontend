import React, { useEffect } from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Function to check AsyncStorage for auth token
    const checkAuthToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");

        // If auth token is found, navigate to HomeScreen
        if (authToken) {
          //get the user details from the token and store it in redux state
          const userInfo = JSON.parse(authToken).user;
          const user = { userInfo };
          console.log("user", user);
          dispatch(setUser(user));
          navigation.replace("Main");
        } else {
          // If no token, navigate to LoginScreen
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log("Error fetching token:", error);
        navigation.replace("Login"); // Fallback to login screen in case of error
      }
    };

    checkAuthToken(); // Run on mount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("../../assets/images/splash.png")} // Set your background image
        style={styles.backgroundImage}
        resizeMode="contain"
      >
        {/* Loading Icon */}
        <ActivityIndicator size="large" color="#0288d1" style={styles.loader} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    position: "absolute",
    bottom: 50, // Position the loader at the bottom
  },
});

export default SplashScreen;
