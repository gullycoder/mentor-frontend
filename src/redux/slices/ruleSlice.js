import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rules: {},
  isRulesLoading: false,
  rulesError: null,
};

const ruleSlice = createSlice({
  name: "rule",
  initialState,
  reducers: {
    setRules: (state, action) => {
      state.rules = action.payload;
    },
    setRulesLoading: (state, action) => {
      state.isRulesLoading = action.payload;
    },
    setRulesError: (state, action) => {
      state.rulesError = action.payload;
    },
  },
});

export const { setRules, setRulesLoading, setRulesError } = ruleSlice.actions;

export default ruleSlice.reducer;
