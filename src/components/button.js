import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../styles"; // Update with actual path

// Button Component
export const ButtonComponent = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style = {}, // Accept custom styles as a prop
  textStyle = {}, // Accept custom text styles as a prop
}) => {
  const buttonStyles = [
    styles.button,
    variant === "primary" && styles.primaryButton,
    variant === "secondary" && styles.secondaryButton,
    variant === "accent" && styles.accentButton,
    disabled && styles.disabledButton,
    style, // Merge additional custom styles
  ];

  const textStyles = [
    styles.buttonText,
    variant === "primary" && styles.primaryButtonText,
    variant === "secondary" && styles.secondaryButtonText,
    variant === "accent" && styles.accentButtonText,
    disabled && styles.disabledButtonText,
    textStyle, // Merge additional custom text styles
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={!disabled ? onPress : null}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: colors.primary.main,
  },
  secondaryButton: {
    backgroundColor: colors.secondary.main,
  },
  accentButton: {
    backgroundColor: colors.accent.main,
  },
  disabledButton: {
    backgroundColor: colors.background.dark,
  },
  buttonText: {
    ...typography.button,
  },
  primaryButtonText: {
    color: colors.primary.onPrimary,
  },
  secondaryButtonText: {
    color: colors.secondary.onSecondary,
  },
  accentButtonText: {
    color: colors.accent.onAccent,
  },
  disabledButtonText: {
    color: colors.text.disabled,
  },
});
