import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

// Import colors, typography, and spacing from your theme file
import { colors, spacing, typography } from "../styles";

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.input, style]}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.medium,
  },
  label: {
    marginBottom: spacing.small,
    color: colors.textPrimary,
    ...typography.label,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.medium,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
    ...typography.input,
  },
});
