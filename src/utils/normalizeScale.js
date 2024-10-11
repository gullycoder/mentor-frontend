import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const BASE_WIDTH = 360; // base width refrence is my device onePlus 9
const BASE_HEIGHT = 720; // base height refrence is my device onePlus 9

const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;

// Normalize based on width
export const normalizeWidth = (size) => {
  return Math.round(size * scaleWidth);
};

// Normalize based on height
export const normalizeHeight = (size) => {
  return Math.round(size * scaleHeight);
};
