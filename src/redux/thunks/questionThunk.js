import {
  setQuestions,
  setQuestionsError,
  setQuestionsLoading,
} from "../slices/questionSlice";
import {
  setAttemptedQuestions,
  setAttemptedQuestionsLoading,
  setAttemptedQuestionsError,
  setAttemptedQuestionsDetails,
} from "../slices/attemptedQuestionSlice";
import { API_URL as TEMP_API_URL } from "../../temp/api";
import ApiError from "../../utils/ApiError";
import { apiCall } from "../../services/apiCall";
import * as Sentry from "@sentry/react"; // Sentry for error tracking
import { useSelector } from "react-redux"; // Use this to get user info from Redux

const getQuestions = (query) => async (dispatch) => {
  const url = `/questions/getQuestions`;
  console.log("getQuestions -> query", query);

  try {
    dispatch(setQuestionsLoading(true)); // Set loading state to true
    // Make the API call
    const response = await apiCall(url, {
      method: "GET",
      data: query,
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

//get attempted questions by user
const getAttemptedQuestions = (query) => async (dispatch) => {
  const url = `/questions/getAttemptedQuestions`;
  try {
    dispatch(setQuestionsLoading(true)); // Set loading state to true
    // Fetch API response
    const response = await apiCall(url, {
      method: "GET",
      data: query,
    });
    const attemptedQuestions = response.data || []; // Extract the data from the response
    dispatch(setQuestions(attemptedQuestions)); // Dispatch the success action with attempted questions data
  } catch (error) {
    console.error("getAttemptedQuestions error:", error);
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

const getAttemptedQuestionDetails = (query) => async (dispatch) => {
  try {
    const url = `/questions/getAttemptedQuestions`;
    dispatch(setAttemptedQuestionsLoading(true)); // Set loading state to true
    // Fetch API response
    const response = await apiCall(url, {
      method: "GET",
      data: query,
    });
    const attemptedQuestions = response.data || {}; // Extract the data from the response
    console.log("attemptedQuestions", attemptedQuestions);
    let attemptedQuestionIds = [];
    let attemptedQuestionsDetails = [];
    if (attemptedQuestions.length === 0) {
      return dispatch(
        setAttemptedQuestionsError("No attempted questions found")
      );
    }
    attemptedQuestions.forEach((item) => {
      attemptedQuestionIds.push({
        questionId: item.question._id,
        isCorrect: item.isCorrect,
        selectedOption: item.selectedOption,
      });
      attemptedQuestionsDetails.push(item.question);
    });
    dispatch(setAttemptedQuestionsDetails(attemptedQuestionIds)); // Dispatch the success action with attempted questions data
    dispatch(
      setQuestions({
        questions: attemptedQuestionsDetails,
        totalcount: null,
      })
    ); // Dispatch the success action with question details data
    return response.data; // Return the data to the calling function
  } catch (error) {
    console.error("getAttemptedQuestionDetails error:", error);
    // Check if the error is an instance of ApiError for more structured error handling
    if (error instanceof ApiError) {
      error.logError(); // Log the error for further debugging
      dispatch(setAttemptedQuestionsError(error.message)); // Dispatch error to update state
    } else {
      // If the error is not an instance of ApiError, handle it as an unexpected error
      console.error("Unexpected error:", error);
      dispatch(
        setAttemptedQuestionsError(error.message || "An unknown error occurred")
      );
    }
  } finally {
    dispatch(setAttemptedQuestionsLoading(false)); // Set loading state to false after error or success
  }
};

export { getQuestions, getAttemptedQuestions, getAttemptedQuestionDetails };
