import {
  setQuestionFilterOption,
  setQuestionFilterOptionLoading,
  setQuestionFilterOptionError,
} from "../slices/questionFilterOptionSlice";
import { API_URL as TEMP_API_URL } from "../../temp/api";

const getQuestionFilterOption = () => async (dispatch, getState) => {
  const API_URL = process.env.API_URL || TEMP_API_URL;
  dispatch(setQuestionFilterOptionLoading(true));
  console.log("get question filter options");
  try {
    // Retrieve the token from user info in Redux store using getState
    let token = getState().user.userInfo.accessToken;
    console.log("token in filteroptions", token);
    if (!token) {
      //get from async storage if not available in redux store
      const authToken = await AsyncStorage.getItem("authToken");
      token = authToken ? JSON.parse(authToken).accessToken : null;
    }
    //if token is not available, throw an error
    if (!token) {
      throw new Error("No token found");
    }
    // Set headers
    const headers = {
      "Content-Type": "application/json",
    };
    // Add Authorization header if the token is available
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/v1/questions/filterOptions`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch question filter options");
    }
    const data = await response.json();
    console.log("data received in filteroptions", data);
    dispatch(setQuestionFilterOption(data.data));
  } catch (error) {
    dispatch(setQuestionFilterOptionError(error.toString()));
    console.error("get question filter options error", error);
  } finally {
    dispatch(setQuestionFilterOptionLoading(false));
  }
};

export { getQuestionFilterOption };
