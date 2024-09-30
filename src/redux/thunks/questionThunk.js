import {
  setQuestions,
  setQuestionsError,
  setQuestionsLoading,
} from "../slices/questionSlice";
import { API_URL as TEMP_API_URL } from "../../temp/api";
import ApiError from "../../utils/ApiError";
import { apiCall } from "../../services/apiCall";
import * as Sentry from "@sentry/react"; // Sentry for error tracking
import { useSelector } from "react-redux"; // Use this to get user info from Redux

const getQuestions = (query) => async (dispatch, getState) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/questions/getQuestions`;
  console.log("getQuestions -> query", query);

  try {
    dispatch(setQuestionsLoading(true)); // Set loading state to true

    // Fetch API response
    const query = {
      questionSource: "UPSC",
      questionSubtopic: "India in the 18th Century",
      questionTopic: "Modern India",
      questionYear: 2022,
    };

    const queryString = new URLSearchParams(query).toString();
    const urlWithParams = `${url}?${queryString}`;

    // Make the API call
    const response = await apiCall(urlWithParams, {
      method: "GET",
    });
    console.log("getQuestions -> response", response);
    const question = response.data[0]; // Extract the data from the response
    totalcount = response.data[1];
    console.log("data received in question", question);
    dispatch(setQuestions(question, totalcount)); // Dispatch the success action with questions data
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
