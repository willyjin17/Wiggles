import { configureStore } from "@reduxjs/toolkit";
import isLoggedInReducer from "../features/isLoggedInSlice";
import violationReducer from "../features/violationSlice";

export const store = configureStore({
  reducer: {
    userLogin: isLoggedInReducer,
    violations: violationReducer,
  },
});
