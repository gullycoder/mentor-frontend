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
    console.log("fetchApiResponse -> response", response);

    const contentType = response.headers.get("content-type");
    let responseData;

    // Read the response body only once
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text(); // Fallback for non-JSON responses
    }

    if (!response.ok) {
      console.log("response is not ok in fetchapi");

      if (contentType && contentType.includes("application/json")) {
        responseData;
      } else if (contentType && contentType.includes("text/html")) {
        console.error("HTML Error Response:", responseData);
        responseData.message = `Non-JSON response received: ${responseData.substring(
          0,
          100
        )}...`;
        throw new ApiError(
          response.status,
          "An HTML error occurred. Please check the server or ngrok configuration."
        );
      } else {
        console.log("responseData in fetchapi", responseData);
        console.log("response.status in fetchapi", response);
        throw new ApiError(
          response.status,
          responseData.message || "An unexpected error occurred",
          responseData.errors || []
        );
      }
    }

    console.log("fetchApiResponse -> responseData", responseData);
    return responseData;
  } catch (error) {
    console.log("fetchApiResponse error", error);
    if (debug) {
      console.error("fetchApiResponse error:", error);
    }
    if (error.statusCode === 401 && retries > 0) {
      // Handle access token expiration (HTTP 401 Unauthorized)
      console.log("Access token expired, trying to refresh...");

      try {
        // Attempt to refresh the access token
        const refreshEndPoint = `${
          TEMP_API_URL || process.env.API_URL
        }/users/refreshToken`;
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
      console.error("Unknown error occurred:", error);
      throw new ApiError(null, "An unknown error occurred");
    }
  }
};
