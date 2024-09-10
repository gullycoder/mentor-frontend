import { setUser, setLoading, setError } from "../slices/userSlice";

export const sendOtp = (email) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(
      "http://rnhly-2409-40d0-1149-5944-433-3a4e-9bd7-7bc2.a.free.pinggy.link/api/v1/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }

    const data = await response.json();
    // No need to update the Redux state with OTP, just handle the UI
    console.log("OTP sent successfully", data);
  } catch (error) {
    dispatch(setError(error.toString()));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = (email, otp) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(
      "http://rnhly-2409-40d0-1149-5944-433-3a4e-9bd7-7bc2.a.free.pinggy.link/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("Login successful", data);
    dispatch(setUser(data.user)); // Store user details in Redux
  } catch (error) {
    dispatch(setError(error.toString()));
  } finally {
    dispatch(setLoading(false));
  }
};

// export const fetchUserData = (userId) => async (dispatch, getState) => {
//   try {
//     dispatch(setLoading(true));
//     // Make sure to await the response and parse JSON correctly
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/todos/1`
//     );
//     const data = await response.json(); // Parse the JSON once

//     console.log("User data", data);
//     dispatch(setUser(data)); // Dispatch action to set user data
//   } catch (error) {
//     dispatch(setError(error.toString())); // Dispatch error action
//   } finally {
//     dispatch(setLoading(false)); // Stop loading
//   }
// };
