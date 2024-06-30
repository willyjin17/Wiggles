import { configureStore } from "@reduxjs/toolkit";
import isLoggedInReducer from "../features/isLoggedInSlice";

export const store = configureStore({
  reducer: {
    userLogin: isLoggedInReducer,
  },
});
