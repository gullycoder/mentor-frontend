import {
  setAttemptedQuestions,
  setAttemptedQuestionsLoading,
  setAttemptedQuestionsError,
} from "../slices/attemptedQuestionSlice";
import ApiError from "../../utils/ApiError";
import { apiCall } from "../../services/apiCall";

// Thunk to get attempted questions

const getTotalQuestionsAttemptedByUser = () => async (dispatch) => {
  const url = `/questionAttempts/getTotalQuestionsAttemptedByUser`;
  try {
    dispatch(setAttemptedQuestionsLoading(true)); // Set loading state to true
    // Fetch API response
    const response = await apiCall(url);
    console.log("getTotalQuestionsAttemptedByUser -> response", response);
    const attemptedQuestions = response?.data || [];
    dispatch(setAttemptedQuestions(attemptedQuestions)); // Dispatch the success action with questions data
    return response.data; // Return the data to the calling function
  } catch {
  } finally {
    dispatch(setAttemptedQuestionsLoading(false)); // Set loading state to false after error or success
  }
};

//submit question attempt

const submitQuestionAttemptedByUser =
  (attemptedQuestions) => async (dispatch, getState) => {
    console.log("submitQuestionAttempt Started in thunk", attemptedQuestions);
    const url = `/questionAttempts/questionAttemptSubmit`;
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
