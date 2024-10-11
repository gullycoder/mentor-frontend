import { setRules, setRulesError, setRulesLoading } from "../slices/ruleSlice";
import { apiCall } from "../../services/apiCall";
import ApiError from "../../utils/ApiError";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getRules = () => async (dispatch) => {
  const url = `/rules/getRules`;

  try {
    dispatch(setRulesLoading(true)); // Set loading state to true
    const response = await apiCall(url); // Fetch API response
    // console.log("getRules getting data block", response);
    console.log("getRules getting data block", response);
    const rulesData = response?.data || {};
    const filterOptions = {
      filterOptions: rulesData?.filterOptions || {},
      typingText: rulesData?.typingText || [],
      mentorshipPlans: rulesData?.mentorshipPlans || [],
    };
    await AsyncStorage.setItem("filterOptions", JSON.stringify(filterOptions)); // Store rules data in local storage
    dispatch(setRules(filterOptions)); // Dispatch the success action with rules data
  } catch (error) {
    const filterOptions = await AsyncStorage.getItem("filterOptions"); // Fetch rules data from local storage
    if (filterOptions) {
      dispatch(setRules(JSON.parse(filterOptions))); // Dispatch the success action with rules data
    }
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
