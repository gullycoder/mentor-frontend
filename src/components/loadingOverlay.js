// LoadingOverlay.js
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const LoadingOverlay = () => {
  const { isRulesLoading } = useSelector((state) => state.rule); // Assuming loading is in the rule slice

  if (!isRulesLoading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#0288d1" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Translucent background
    zIndex: 1000,
  },
});

export default LoadingOverlay;
