import { setUser, setLoading, setError } from "../slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL as TEMP_API_URL } from "../../temp/api";
import { apiCall } from "../../services/apiCall";
import ApiError from "../../utils/ApiError";

//asyncStorage Operations for storing and retrieving token
const setAuthToken = async (authTokenDetails) => {
  const jasonValueofAuthToken = JSON.stringify(authTokenDetails);
  try {
    await AsyncStorage.setItem("authToken", jasonValueofAuthToken);
  } catch (error) {
    console.error("Failed to set auth token:", error);
    throw new ApiError(500, "Failed to set auth token");
  }
};

//get auth token from redux state and return it

const getAuthToken = (state) => state.user.userInfo.accessToken;
console.log("getAuthToken", getAuthToken);

// const getAuthToken = async () => {
//   try {
//     const authToken = await AsyncStorage.getItem("authToken");
//     const authTokenDetails = authToken ? JSON.parse(authToken) : null;
//     return authTokenDetails;
//   } catch (error) {
//     console.error("Failed to get auth token:", error);
//     throw new ApiError(500, "Failed to get auth token");
//   }
// };

const getOtp = (email) => async (dispatch) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/users/register`;
  try {
    dispatch(setLoading(true));
    const response = await apiCall(url, {
      method: "POST",
      data: { email },
    });
    // console.log("getOtp -> response", response);
    if (!response.success) {
      throw new Error("Failed to send OTP");
    }
    // No need to update the Redux state with OTP, just handle the UI
    //return success message;
    return { message: "OTP sent successfully", success: true };
  } catch (error) {
    dispatch(setError(error.toString()));
    console.log("getOtp -> error", error);
    //return error;
    return { message: "Failed to send OTP", success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

const verifyOtp = (email, otp) => async (dispatch) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/users/login`;
  try {
    dispatch(setLoading(true));
    const response = await apiCall(url, {
      method: "POST",
      data: { email, otp },
    });

    console.log("verifyOtp -> response", response);
    if (!response.success) {
      console.log("if block verifyOtp");
      throw new Error(response.message);
    }

    const authTokenDetails = {
      accessToken: response.data.accessToken,
      user: response.data.user,
      refreshToken: response.data.refreshToken,
    };
    const jasonValueofAuthToken = JSON.stringify(authTokenDetails);
    console.log("token", jasonValueofAuthToken);
    dispatch(
      setUser({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    ); // Store user details in Redux
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

const refreshAccessToken = async (refreshEndPoint) => {
  try {
    // Retrieve the refresh token from AsyncStorage only
    const authToken = await AsyncStorage.getItem("authToken");
    const authTokenDetails = authToken ? JSON.parse(authToken) : null;
    const { refreshToken } = authTokenDetails || {};

    if (!refreshToken) {
      console.log("Refresh token not found wala block");
      throw new Error("Refresh token not found");
    }

    // Make a request to refresh the access token
    const response = await fetch(refreshEndPoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(
        response.status,
        errorData.message || "Token refresh failed"
      );
    }

    const data = await response.json();

    // Save the new access token and refresh token in AsyncStorage
    const newAuthTokenDetails = {
      accessToken: data.data.accessToken,
      user: data.data.user,
      refreshToken: data.data.refreshToken,
    };

    await setAuthToken(newAuthTokenDetails);

    return data.data.accessToken; // Return the new access token
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

export { getOtp, verifyOtp, getAuthToken };
