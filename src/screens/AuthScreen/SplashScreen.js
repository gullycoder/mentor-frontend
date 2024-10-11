import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { getRules } from "../../redux";
import { LoadingIndicator } from "../../components";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //check Auth token
  const checkAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      if (authToken) {
        const userInfo = JSON.parse(authToken);
        console.log("user", userInfo);
        dispatch(setUser(userInfo));

        // Call fetchApiData with multiple API actions
        await fetchApiData([getRules]); // Pass the required API actions here
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Error fetching token:", error);
      navigation.replace("Login");
    }
  };

  // Fetch API data

  const fetchApiData = async (apiCalls) => {
    try {
      setError(false); // Reset error state
      for (const apiCall of apiCalls) {
        await dispatch(apiCall());
      }
      navigation.replace("Main");
    } catch (error) {
      console.log("Error fetching API data:", error);
      setError(true); // Set error state to true
    } finally {
      setLoading(false); // Loading is finished regardless of success or failure
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("../../assets/images/splash.png")} // Set your background image
        style={styles.backgroundImage}
        resizeMode="contain"
      >
        {/* Loading Icon */}
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Button
              title="Retry"
              onPress={() => fetchApiData([getRules])}
              color="#0288d1"
            />
          </View>
        ) : null}
        {/* <ActivityIndicator size="large" color="#0288d1" style={styles.loader} /> */}
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
    // aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
