import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input, ButtonComponent, UniversalModal } from "../../components";
import { sendOtp, loginUser } from "../../redux"; // Import the thunks

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpInputDisabled, setIsOtpInputDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
  const [isApiLoading, setIsApiLoading] = useState(false); // API request state
  const [otpError, setOtpError] = useState(false); // State to handle OTP request error

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const handleSendOtp = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    setIsModalVisible(true); // Show modal to confirm email
  };

  const confirmSendOtp = () => {
    setIsApiLoading(true); // Start loading
    setOtpError(false); // Reset OTP error state
    dispatch(sendOtp(email)) // Dispatch the action to send OTP
      .then(() => {
        setIsOtpSent(true);
        setIsOtpInputDisabled(false);
        setIsModalVisible(false); // Hide modal after confirmation
      })
      .catch((error) => {
        setOtpError(true); // Set OTP error state
        Alert.alert("Error", "Failed to send OTP. Please try again.");
      })
      .finally(() => {
        setIsApiLoading(false); // Stop loading
      });
  };

  const handleLogin = () => {
    if (!email || !otp) {
      Alert.alert("Error", "Please enter both email and OTP");
      return;
    }

    dispatch(loginUser(email, otp)).then(() => {
      navigation.navigate("Home"); // Navigate to Home screen on successful login
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <ButtonComponent
        title="Send OTP"
        onPress={handleSendOtp}
        disabled={isLoading || isOtpSent}
      />
      {!isApiLoading && isOtpSent && !otpError && (
        <>
          <Input
            label="OTP"
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
            keyboardType="numeric"
            style={{ marginTop: 20 }}
            editable={!isOtpInputDisabled}
          />
          <ButtonComponent
            title="Submit"
            onPress={handleLogin}
            disabled={isLoading || !isOtpSent}
          />
        </>
      )}
      {isApiLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      {otpError && (
        <Text style={styles.error}>Failed to send OTP. Please try again.</Text>
      )}
      {error && <Text style={styles.error}>{error}</Text>}

      <UniversalModal
        visible={isModalVisible}
        title="Confirm Email"
        message={`Please confirm the email: ${email}`}
        onClose={() => setIsModalVisible(false)} // Close modal if user cancels
        onConfirm={confirmSendOtp} // Confirm OTP send action
        showConfirmButton={true}
        confirmText="Send OTP"
        cancelText="Cancel"
        isError={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    textAlign: "center",
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

export default LoginScreen;
