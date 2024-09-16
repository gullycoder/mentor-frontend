import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../styles";
import { Input } from "./input";

export const OtpInput = ({ otp, setOtp, label }) => {
  const inputs = useRef([]);

  const handleOtpChange = (text, index) => {
    // Update the OTP value
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp.join(""));

    // Move to the next input box if a digit is entered
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace to move to previous input box
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputs.current[index - 1].focus(); // Move focus to the previous input box
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.containerOtp}>
        {Array(6)
          .fill("")
          .map((_, index) => (
            <TextInput
              key={index}
              value={otp[index] || ""}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              ref={(el) => (inputs.current[index] = el)}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.medium,
    marginTop: spacing.medium,
  },
  containerOtp: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    marginBottom: spacing.small,
    color: colors.textPrimary,
    ...typography.label,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 20,
    textAlign: "center",
    width: 40,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing.medium,
    ...typography.input,
  },
});
