import ApiError from "../utils/ApiError";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For token storage
import {
  getAuthToken,
  refreshAccessToken,
  setAuthToken,
  clearAuthToken,
} from "./authService";
import { TEMP_API_URL } from "../temp/api";

export const fetchApiResponse = async (
  url,
  options = {},
  retries = 2,
  debug = false
) => {
  console.log("fetchApiResponse called", url);
  if (debug) console.log("Fetching URL:", url);

  try {
    // Ensure that the body is properly stringified if it's an object or array
    if (options.body && typeof options.body === "object") {
      options.body = JSON.stringify(options.body);
    }

    // Ensure the Content-Type is set to application/json if it's not already set
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers, // Spread any additional headers provided in the options
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      console.log("response is not ok in fetchapi");
      const errorData = await response.json();
      console.log("errorData in fetchapi", errorData);
      console.log("response.status in fetchapi", response);
      throw new ApiError(
        response.status,
        errorData.message || "An unexpected error occurred",
        errorData.errors || []
      );
    }
    return await response.json();
  } catch (error) {
    if (debug) {
      console.error("fetchApiResponse error:", error);
    }
    if (error.status === 401 && retries > 0) {
      console.log("401 error in fetchapi", error);
      // Handle access token expiration (HTTP 401 Unauthorized)
      console.log("Access token expired, trying to refresh...");

      try {
        // Attempt to refresh the access token
        const refreshEndPoint = `${
          TEMP_API_URL || process.env.API_URL
        }/user/refreshToken`;
        const newAccessToken = await refreshAccessToken(refreshEndPoint);

        if (newAccessToken) {
          // Retry the original request with the new access token
          options.headers.Authorization = `Bearer ${newAccessToken}`;
          return fetchApiResponse(url, options, retries - 1, debug);
        }
      } catch (refreshError) {
        // If refreshing the token fails, redirect to login
        console.log("Token refresh failed, redirecting to login...");
        //need to implement navigateToLoginScreen
        throw new ApiError(401, "Session expired. Please login again.");
      }
    }

    if (ApiError.isNetworkError(error)) {
      if (debug) console.log("Network error identified:", error.message);
      if (retries > 0) {
        if (debug) console.log("Retrying request due to network error...");
        return fetchApiResponse(url, options, retries - 1, debug);
      } else {
        if (debug) console.log("Retries exhausted. Throwing final error.");
        throw new ApiError(null, "Network request failed");
      }
    } else if (error instanceof ApiError) {
      error.logError();
      throw error;
    } else {
      throw new ApiError(null, "An unknown error occurred");
    }
  }
};
