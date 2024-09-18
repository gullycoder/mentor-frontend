import { setUser, setLoading, setError } from "../slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL as TEMP_API_URL } from "../../temp/api";

//import your API URL here from .env file

const getOtp = (email) => async (dispatch) => {
  const API_URL = TEMP_API_URL;
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_URL}/api/v1/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }

    const data = await response.json();
    // No need to update the Redux state with OTP, just handle the UI
    //return success message;
    return { message: "OTP sent successfully", success: true };
  } catch (error) {
    dispatch(setError(error.toString()));
    //return error;
    return { message: "Failed to send OTP", success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

const verifyOtp = (email, otp) => async (dispatch) => {
  const API_URL = process.env.API_URL || TEMP_API_URL;
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_URL}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    console.log("verifyOtp -> response", response);
    const data = await response.json();
    console.log("verifyOtp -> data", data);
    if (!response.ok) {
      throw new Error(data.message);
    }

    const authTokenDetails = {
      accessToken: data.data.accessToken,
      user: data.data.user,
    };
    const jasonValueofAuthToken = JSON.stringify(authTokenDetails);
    console.log("token", jasonValueofAuthToken);
    dispatch(setUser(authTokenDetails)); // Store user details in Redux
    await AsyncStorage.setItem("authToken", jasonValueofAuthToken); // Store token in local storage
    //return success message;
    return { message: "Login successful", success: true };
  } catch (error) {
    console.log("catch block", error.message);
    dispatch(setError(error.toString()));
    //return error;
    return { message: error.message, success: false };
  } finally {
    console.log("finally block");
    dispatch(setLoading(false));
  }
};

export { getOtp, verifyOtp };
