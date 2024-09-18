import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionFilterOptionInfo: null,
  isQuestionFilterOptionLoading: false,
  questionFilterOptionError: null,
};

const questionFilterOptionSlice = createSlice({
  name: "questionFilterOption",
  initialState,
  reducers: {
    // Set the question filter option data
    setQuestionFilterOption: (state, action) => {
      state.questionFilterOptionInfo = action.payload;
    },
    // Set loading state
    setQuestionFilterOptionLoading: (state, action) => {
      state.isQuestionFilterOptionLoading = action.payload;
    },
    // Set error state
    setQuestionFilterOptionError: (state, action) => {
      state.questionFilterOptionError = action.payload;
    },
  },
});

// Export actions generated by createSlice
export const {
  setQuestionFilterOption,
  setQuestionFilterOptionLoading,
  setQuestionFilterOptionError,
} = questionFilterOptionSlice.actions;
// Export the reducer to be used in store
export default questionFilterOptionSlice.reducer;