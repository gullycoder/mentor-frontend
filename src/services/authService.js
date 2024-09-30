import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiError from "../utils/ApiError";

export const refreshAccessToken = async (refreshEndPoint) => {
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

    return data.data.accessToken; // Return the new access token
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};
