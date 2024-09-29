import {
  setAttemptedQuestions,
  setAttemptedQuestionsLoading,
  setAttemptedQuestionsError,
} from "../slices/attemptedQuestionSlice";
import { API_URL as TEMP_API_URL } from "../../temp/api";
import ApiError from "../../utils/ApiError";
import { apiCall } from "../../services/apiCall";
import * as Sentry from "@sentry/react"; // Sentry for error tracking

// Thunk to get attempted questions

const getTotalQuestionsAttemptedByUser = () => async (dispatch) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/questionAttempts/getTotalQuestionsAttemptedByUser`;
  // Get userInfo from the userSlice in Redux
  const { userInfo } = getState().user; // Access user slice from the Redux store
  try {
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
    dispatch(setAttemptedQuestionsLoading(true)); // Set loading state to true
    // Fetch API response
    const response = await apiCall(url, {
      method: "GET",
      headers: headers,
    });
    const [data] = response?.data || []; // the first element of the array
    const attemptedQuestions = data?.questions || [];
    dispatch(setAttemptedQuestions(attemptedQuestions)); // Dispatch the success action with questions data
    return response.data; // Return the data to the calling function
  } catch {
  } finally {
  }
};

//submit question attempt

const submitQuestionAttemptedByUser =
  (attemptedQuestions) => async (dispatch, getState) => {
    console.log("submitQuestionAttempt Started in thunk", attemptedQuestions);
    const url = `${process.env.EXPO_PUBLIC_API_URL}/questionAttempts/questionAttemptSubmit`;
    try {
      // Check if attemptedQuestions exists
      if (!attemptedQuestions || attemptedQuestions.length === 0) {
        throw new ApiError(null, "No attempted questions found");
      }

      dispatch(setAttemptedQuestionsLoading(true)); // Set loading state to true
      // Fetch API response
      const response = await apiCall(url, {
        method: "POST",
        data: attemptedQuestions,
      });

      dispatch(setAttemptedQuestions(attemptedQuestions)); // Dispatch the success action with questions data
      return response.data; // Return the data to the calling function
    } catch (error) {
      throw new ApiError(500, error.message || "Error saving question attempt");
    } finally {
      dispatch(setAttemptedQuestionsLoading(false)); // Set loading state to false after error or success
    }
  };

export { getTotalQuestionsAttemptedByUser, submitQuestionAttemptedByUser };
