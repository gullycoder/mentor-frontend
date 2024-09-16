import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { colors, spacing, typography } from "../../styles";

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "34%", // Image will cover 30% of the screen height
    marginBottom: 0, // Space between the image and the login title
    opacity: 0.8, // 80% opacity
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emailText: {
    fontSize: 16,
    padding: 10,
  },
  editButton: {
    backgroundColor: colors.background.dark,
    paddingVertical: 0,
    paddingHorizontal: spacing.small,
  },
  editButtonText: {
    color: colors.background.darker,
    ...typography.button,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
