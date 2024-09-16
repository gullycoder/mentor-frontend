import { setUser, setLoading, setError } from "../slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL as TEMP_API_URL } from "../../temp/api";

//import your API URL here from .env file

export const getOtp = (email) => async (dispatch) => {
  const API_URL = process.env.API_URL || TEMP_API_URL;
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_URL}/api/v1/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }

    const data = await response.json();
    // No need to update the Redux state with OTP, just handle the UI
    //return success message;
    return { message: "OTP sent successfully", success: true };
  } catch (error) {
    dispatch(setError(error.toString()));
    //return error;
    return { message: "Failed to send OTP", success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyOtp = (email, otp) => async (dispatch) => {
  const API_URL = process.env.API_URL || TEMP_API_URL;
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_URL}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    console.log("verifyOtp -> response", response);
    const data = await response.json();
    console.log("verifyOtp -> data", data);
    if (!response.ok) {
      throw new Error(data.message);
    }

    const authTokenDetails = {
      accessToken: data.data.accessToken,
      user: data.data.user,
    };
    const jasonValueofAuthToken = JSON.stringify(authTokenDetails);
    console.log("token", jasonValueofAuthToken);
    dispatch(setUser(data.data.user)); // Store user details in Redux
    await AsyncStorage.setItem("authToken", jasonValueofAuthToken); // Store token in local storage
    //return success message;
    return { message: "Login successful", success: true };
  } catch (error) {
    console.log("catch block", error.message);
    dispatch(setError(error.toString()));
    //return error;
    return { message: error.message, success: false };
  } finally {
    console.log("finally block");
    dispatch(setLoading(false));
  }
};

//successful response from the API
// {
//   "statusCode": 200,
//   "data": {
//       "user": {
//           "_id": "66d6a754da7c072b65363e8f",
//           "email": "suresh.kumar@alumni.iitd.ac.in",
//           "__v": 0,
//           "createdAt": "2024-09-03T06:06:11.144Z",
//           "mobileNumber": "suresh.kumar@alumni.iitd.ac.in",
//           "questionAttemptHistory": [],
//           "updatedAt": "2024-09-14T07:45:22.375Z",
//           "userName": "suresh.kumar@alumni.iitd.ac.in",
//           "userType": "user",
//           "videoWatchHistory": []
//       },
//       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ2YTc1NGRhN2MwNzJiNjUzNjNlOGYiLCJ1c2VyVHlwZSI6InVzZXIiLCJlbWFpbCI6InN1cmVzaC5rdW1hckBhbHVtbmkuaWl0ZC5hYy5pbiIsInVzZXJOYW1lIjoic3VyZXNoLmt1bWFyQGFsdW1uaS5paXRkLmFjLmluIiwiaWF0IjoxNzI2Mjk5OTIyLCJleHAiOjE3MjYzODYzMjJ9.R976jBihX6S52wH4SGNmUmmTbMh8hoSpX-YeHR0HuwU",
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ2YTc1NGRhN2MwNzJiNjUzNjNlOGYiLCJpYXQiOjE3MjYyOTk5MjIsImV4cCI6MTcyNjkwNDcyMn0.BN2acPB9Ie0hyRpQpCwezavzFpun2h3Ff6vyaeBgmI0"
//   },
//   "message": "Login successful",
//   "success": true
// }

//failed response from the API, wrong OTP
// {
//   "success": false,
//   "message": "Invalid OTP and email"
// "message": "Invalid OTP"
// "message": "OTP has expired"
// }
