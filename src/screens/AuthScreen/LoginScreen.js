import React, { useState } from "react";
import { View, Text, Alert, ActivityIndicator, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getOtp, verifyOtp, setError } from "../../redux"; // Import the thunks
import {
  Input,
  ButtonComponent,
  UniversalModal,
  OtpInput,
} from "../../components";
import { styles } from "./style"; // Import the styles

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); //max length 6 digits
  const [isOtpRequested, setisOtpRequested] = useState(false);
  const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  // Handle editing email
  const handleEditEmail = () => {
    setisOtpRequested(false); // Reset OTP sent state
    setOtp(""); // Clear OTP input
    setIsEmailInputDisabled(false); // Enable email input
    dispatch(setError(null)); // Clear error state
  };

  // Handle submit OTP
  const handelSubmitOtp = async () => {
    //check if email and otp are not empty
    if (!email || !otp) {
      Alert.alert("Error", "Please enter both email and OTP");
      return;
    }
    //try to login the user with the email and otp in try block and catch the error
    try {
      //dispatch the action to login the user with email and otp
      const reponse = await dispatch(verifyOtp(email, otp));
      if (reponse.success) {
        //reset all the states
        setOtp("");
        setEmail("");
        setisOtpRequested(false);
        setIsEmailInputDisabled(false);
        dispatch(setError(null));
        //navigate to the home screen
        navigation.navigate("Main");
      } else {
        //show the error in alert
        if (reponse.message === "Invalid OTP") {
          console.log("invalid otp block");
          setOtp("");
          Alert.alert(`${reponse.message}`, `Please try again.`);
          return;
        } else if (reponse.message === "Network request failed") {
          console.log("Network request failed block");
          Alert.alert("Please check your internet connection");
          return;
        }
        console.log("OTP Expired block");
        Alert.alert(`${reponse.message}`, `Please try again.`);
        handleEditEmail();
      }
    } catch (error) {
      //show the error in alert
      Alert.alert(error.message);
      console.log("errorscreen block", error);
    }
  };

  // Handle submit email
  const handelEnterEmail = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    setIsModalVisible(true); // Show modal to confirm email
  };

  const handelSubmitEmail = async () => {
    try {
      setIsModalVisible(false); // Hide modal after confirmation
      console.log("reponse is being getting");
      const response = await dispatch(getOtp(email)); // Dispatch the action to send OTP
      console.log("response", response);
      if (response.success) {
        setIsEmailInputDisabled(true); // Disable email input after OTP is sent
        setisOtpRequested(true);
      } else {
        Alert.alert("Error", "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/login.png")} // Path to background image
        // style={styles.backgroundImage}
        resizeMode="cover"
        style={styles.image}
      ></Image>
      <Text style={styles.title}> Login</Text>

      {/* Email Input */}
      {!isEmailInputDisabled ? (
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isEmailInputDisabled}
          // style={isOtpRequested && { borderRadius: 0 }}
        />
      ) : (
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>{email}</Text>
          <ButtonComponent
            title="Edit"
            onPress={handleEditEmail}
            style={styles.editButton}
            textStyle={styles.editButtonText}
            variant="secondary"
          />
        </View>
      )}

      {/* Send OTP button */}
      {!isOtpRequested && (
        <ButtonComponent
          title="Send OTP"
          onPress={handelEnterEmail}
          disabled={
            isLoading ||
            isOtpRequested ||
            email.includes("@") == false ||
            email.includes(".") == false
          }
          variant="secondary"
        />
      )}

      {/* OTP Input */}
      {!isLoading && isOtpRequested && (
        <>
          <OtpInput otp={otp} setOtp={setOtp} label="OTP" />
          <ButtonComponent
            title="Submit"
            onPress={handelSubmitOtp}
            disabled={isLoading || !isOtpRequested || otp.length !== 6}
            variant="secondary"
          />
        </>
      )}

      {/* Loader */}
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {/* error */}
      {/* {otpError && (
        <Text style={styles.error}>Failed to send OTP. Please try again.</Text>
      )} */}

      {error && <Text style={styles.error}>{error}</Text>}

      {/* Confirm Email Modal */}
      <UniversalModal
        visible={isModalVisible}
        title="Confirm Your Email"
        message={`${email}`}
        onClose={() => setIsModalVisible(false)} // Close modal if user cancels
        onConfirm={handelSubmitEmail} // Confirm OTP send action
        showConfirmButton={true}
        confirmText="Send OTP"
        cancelText="Cancel"
        isError={false}
      />
    </View>
  );
};

export default LoginScreen;
