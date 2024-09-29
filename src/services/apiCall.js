import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For token storage
import { TEMP_API_URL } from "../temp/api";
import {
  refreshAccessToken,
  setAuthToken,
  clearAuthToken,
} from "./authService";
import ApiError from "../utils/ApiError";

// Define the base API URL and Cloudinary URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const CLOUDINARY_BASE_URL = `${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}`;
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // Set a request timeout of 5 seconds
});

// Request interceptor to add the access token to the Authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Endpoints that don't require Authorization
      const noAuthEndpoints = ["/users/register", "/users/login"];

      // Only attach Authorization header to protected endpoints
      if (
        !noAuthEndpoints.includes(config.url) &&
        !config.url.startsWith(CLOUDINARY_BASE_URL)
      ) {
        console.log("config still adding the auth token");
        const authToken = await AsyncStorage.getItem("authToken");
        const accessToken = authToken
          ? JSON.parse(authToken).accessToken
          : null;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
      throw new ApiError(401, "Session expired. Please login again.");
    }
    console.log("config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 (Unauthorized) errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const authToken = await AsyncStorage.getItem("authToken");
        const { refreshToken, user } = authToken ? JSON.parse(authToken) : null;

        if (refreshToken) {
          // Attempt to refresh the access token
          const refreshResponse = await refreshAccessToken(
            `${
              TEMP_API_URL || process.env.EXPO_PUBLIC_API_URL
            }/users/refreshToken`
          );

          if (refreshResponse?.accessToken) {
            // Store the new access token and retry the original request
            await setAuthToken({
              accessToken: refreshResponse.accessToken,
              user,
              refreshToken,
            });

            originalRequest.headers.Authorization = `Bearer ${refreshResponse.accessToken}`;
            return axiosInstance(originalRequest); // Retry the original request
          }
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        await clearAuthToken(); // Clear token if refresh fails
        throw new ApiError(401, "Session expired. Please login again.");
      }
    }

    return Promise.reject(error); // Reject all other errors
  }
);

// Utility function for making API requests
export const apiCall = async (url, options = {}, retries = 2) => {
  console.log("apiCall -> url", url);
  try {
    const config = {
      url,
      method: options.method || "GET",
      data: options.data, // Use data for POST/PUT requests
      headers: options.headers || {},
    };

    // If the request includes FormData (for file uploads), let axios handle the multipart Content-Type
    if (options.data instanceof FormData) {
      delete config.headers["Content-Type"]; // Don't set Content-Type manually, let Axios handle it
    }

    const response = await axiosInstance(config);
    return response?.data; // Return the response data
  } catch (error) {
    if (retries > 0 && ApiError.isNetworkError(error)) {
      // Retry only for network errors
      console.log("Retrying request due to network error...");
      return apiCall(url, options, retries - 1);
    }

    if (error.response) {
      console.log("error yahan pe hai", error.response);
      console.error(
        `API Error [${error.response.status}]: ${error.response.data.message}`
      );
    } else {
      console.error("API call failed:", error.message);
    }

    throw error; // Throw error if not recoverable
  }
};
