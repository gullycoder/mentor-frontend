import {
  setQuestions,
  setQuestionsError,
  setQuestionsLoading,
} from "../slices/questionSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL as TEMP_API_URL } from "../../temp/api";

export const getQuestions = (query) => async (dispatch) => {
  const API_URL = process.env.API_URL || TEMP_API_URL;
  try {
    // Retrieve the token from AsyncStorage
    // const token = await AsyncStorage.getItem('authToken');
    const authToken = await AsyncStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No token found");
    }
    const token = JSON.parse(authToken).accessToken;

    // Set headers
    const headers = {
      "Content-Type": "application/json",
    };

    // Add Authorization header if the token is available
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    dispatch(setQuestionsLoading(true));
    const response = await fetch(`${API_URL}/api/v1/questions/getQuestions`, {
      method: "GET",
      headers: headers,
      query: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await response.json();
    console.log("data received in question", data);
    dispatch(setQuestions(data.data));
  } catch (error) {
    console.error("get questionError", error);
    dispatch(setQuestionsError(error.toString()));
  } finally {
    dispatch(setQuestionsLoading(false));
  }
};

const questionThunk = {
  getQuestions,
};
export default questionThunk;
