import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../styles"; // Update with actual path

// Button Component
export const ButtonComponent = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}) => {
  console.log("ButtonComponent ->title,onpress, variant", variant);
  const buttonStyles = [
    styles.button,
    variant === "primary" && styles.primaryButton,
    variant === "secondary" && styles.secondaryButton,
    variant === "accent" && styles.accentButton,
    disabled && styles.disabledButton,
  ];

  const textStyles = [
    styles.buttonText,
    variant === "primary" && styles.primaryButtonText,
    variant === "secondary" && styles.secondaryButtonText,
    variant === "accent" && styles.accentButtonText,
    disabled && styles.disabledButtonText,
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
    paddingVertical: spacing.medium, // Button height based on vertical spacing
    paddingHorizontal: spacing.large, // Button width based on horizontal spacing
    borderRadius: 8, // Rounded corners for better aesthetics
    justifyContent: "center",
    alignItems: "center",
    elevation: 2, // Subtle shadow for depth
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
    backgroundColor: colors.background.dark, // Subtle background for disabled
  },
  buttonText: {
    ...typography.button, // Typography defined in the typography file
  },
  primaryButtonText: {
    color: colors.primary.onPrimary, // Text color for primary buttons
  },
  secondaryButtonText: {
    color: colors.secondary.onSecondary, // Text color for secondary buttons
  },
  accentButtonText: {
    color: colors.accent.onAccent, // Text color for accent buttons
  },
  disabledButtonText: {
    color: colors.text.disabled, // Disabled text color
  },
});

// export default ButtonComponent;
