import {
  setQuestions,
  setQuestionsError,
  setQuestionsLoading,
} from "../slices/questionSlice";
import { API_URL as TEMP_API_URL } from "../../temp/api";
import ApiError from "../../utils/ApiError";
import { fetchApiResponse } from "../../services/apiCall";
import * as Sentry from "@sentry/react"; // Sentry for error tracking
import { useSelector } from "react-redux"; // Use this to get user info from Redux

const getQuestions = (query) => async (dispatch, getState) => {
  const url = `${TEMP_API_URL || process.env.API_URL}/questions/getQuestions`;

  try {
    // Get userInfo from the userSlice in Redux
    const { userInfo } = getState().user; // Access user slice from the Redux store
    // Check if userInfo exists
    if (!userInfo || !userInfo.accessToken) {
      throw new ApiError(null, "No user information found");
    }

    const token = userInfo.accessToken;

    // Set headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    };

    dispatch(setQuestionsLoading(true)); // Set loading state to true

    // Fetch API response
    const response = await fetchApiResponse(url, {
      method: "GET",
      headers: headers,
      query: JSON.stringify(query),
    });
    const [data] = response?.data || []; // the first element of the array
    const question =
      {
        questions: data?.questions || [],
        totalQuestions: data?.totalCount || 0,
      } || {};
    console.log("data received in question", question);
    dispatch(setQuestions(question)); // Dispatch the success action with questions data
    return response.data; // Return the data to the calling function
  } catch (error) {
    console.error("getQuestions error:", error);

    // Capture the error in Sentry
    Sentry.captureException(error);

    // Check if the error is an instance of ApiError for more structured error handling
    if (error instanceof ApiError) {
      error.logError(); // Log the error for further debugging
      dispatch(setQuestionsError(error.message)); // Dispatch error to update state
    } else {
      // If the error is not an instance of ApiError, handle it as an unexpected error
      console.error("Unexpected error:", error);
      dispatch(setQuestionsError(error.message || "An unknown error occurred"));
    }
  } finally {
    dispatch(setQuestionsLoading(false)); // Set loading state to false after error or success
  }
};

export { getQuestions };
