import { Dimensions, StyleSheet, ScrollView, Text, View } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");

// Define a base screen width for scaling (similar to the magic number used for rem)
const BASE_WIDTH = 360;

// Scaling utility functions
const scale = (size) => (width / BASE_WIDTH) * size;
const verticalScale = (size) => (height / BASE_WIDTH) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Utility function to maintain aspect ratio (width:height)
const maintainAspectRatio = (width, aspectRatio) => {
  return {
    width: scaleWidth(width),
    height: scaleWidth(width) / aspectRatio, // width divided by aspect ratio gives the height
  };
};

// Export the scaling functions
export {
  scale,
  verticalScale,
  moderateScale,
  maintainAspectRatio,
  width,
  height,
};
