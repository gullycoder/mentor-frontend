import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import questionReducer from "./slices/questionSlice";
import ruleReducer from "./slices/ruleSlice";
import attemptedQuestionReducer from "./slices/attemptedQuestionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    rule: ruleReducer,
    question: questionReducer,
    attemptedQuestion: attemptedQuestionReducer,
  },
});
