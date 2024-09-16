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
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.primary,
    // padding: spacing.small,
    marginHorizontal: spacing.small,
    marginTop: spacing.large * 2,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: colors.background.secondary,
  },
  sourceText: {
    ...typography.subtitle2,
    color: colors.text.secondary,
  },
  yearText: {
    ...typography.subtitle2,
    color: colors.text.secondary,
  },
  questionText: {
    ...typography.heading3,
    color: colors.text.primary,
    marginBottom: spacing.large,
  },
});
