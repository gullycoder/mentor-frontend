import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set the user's data
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Clear user state (useful for logout)
    clearUser: (state) => {
      state.userInfo = null;
      state.error = null;
    },
  },
});

// Export actions generated by createSlice
export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

// Export the reducer to be used in store
export default userSlice.reducer;