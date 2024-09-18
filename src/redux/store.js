import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import questionReducer from "./slices/questionSlice";
import questionFilterOptionSlice from "./slices/questionFilterOptionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    question: questionReducer,
    questionFilterOption: questionFilterOptionSlice,
  },
});
