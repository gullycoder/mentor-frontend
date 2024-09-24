import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiError from "../utils/ApiError";

export const getAuthToken = async () => {
  const authTokenDetails = await AsyncStorage.getItem("authToken");
  return JSON.parse(authTokenDetails);
};

export const setAuthToken = async (authTokenDetails) => {
  await AsyncStorage.setItem("authToken", JSON.stringify(authTokenDetails));
};

export const clearAuthToken = async () => {
  await AsyncStorage.removeItem("authToken");
};

export const refreshAccessToken = async (refreshEndPoint) => {
  try {
    // Retrieve the refresh token from AsyncStorage
    const authTokenDetails = await getAuthToken();
    const { refreshToken } = authTokenDetails || {};

    if (!refreshToken) {
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
