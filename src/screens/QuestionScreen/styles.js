import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../styles";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    backgroundColor: colors.background.default,
  },

  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
