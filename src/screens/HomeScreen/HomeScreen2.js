import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const HomeScreen2 = () => {
  const userData = useSelector((state) => state.user);
  console.log("User data", userData);
  return (
    <View>
      <Text>HomeScreen2</Text>
    </View>
  );
};

export default HomeScreen2;

const styles = StyleSheet.create({});
