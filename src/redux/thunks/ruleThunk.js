import { setRules, setRulesError, setRulesLoading } from "../slices/ruleSlice";
import { apiCall } from "../../services/apiCall";
import { API_URL as TEMP_API_URL } from "../../temp/api";
import ApiError from "../../utils/ApiError";

const getRules = () => async (dispatch) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/rules/getRules`;

  try {
    dispatch(setRulesLoading(true)); // Set loading state to true
    const response = await apiCall(url); // Fetch API response
    // console.log("getRules getting data block", response);

    const rulesData = response?.data?.[0] || {};
    const filterOptions = {
      filterOptions: rulesData?.ruleDetails || {},
      typingText: rulesData?.typingText || {},
    };

    dispatch(setRules(filterOptions)); // Dispatch the success action with rules data
  } catch (error) {
    console.log("getRules getting error block");

    // Check if error is an instance of ApiError
    if (error instanceof ApiError) {
      error.logError(); // Log the error for further debugging
      //log the complete instance of error for debugging purposes
      console.log("error instance", error);

      // Handle different error types
      if (error.isClientError()) {
        alert(`Client Error: ${error.message}`); // User-friendly client-side error message
      } else if (error.isServerError()) {
        alert(`Server Error: ${error.message}`); // User-friendly server-side error message
      } else if (ApiError.isNetworkError(error)) {
        alert(
          "Network Error: Please check your internet connection and try again."
        );
      } else {
        console.log("error check block");
        alert(`Unexpected Error: ${error.message}`);
      }
    } else {
      // If the error is not an instance of ApiError, log it as an unexpected error
      console.error("Unexpected error:", error);
      alert(`Unexpected Error: ${error.message || error.toString()}`);
    }

    // Dispatch error action to update the state
    dispatch(setRulesError(error.message || "An unknown error occurred"));
  } finally {
    dispatch(setRulesLoading(false)); // Set loading state to false after error or success
  }
};

export { getRules };
