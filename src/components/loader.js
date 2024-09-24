// LoadingIndicator.js
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const LoadingIndicator = ({ size = "large", color = "#0288d1" }) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10, // Ensures it is on top of other components
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional: Add semi-transparent background
  },
});
