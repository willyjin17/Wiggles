import { createSlice } from "@reduxjs/toolkit";

const loggedInState =
  localStorage.getItem("isLoggedIn") !== null
    ? JSON.parse(localStorage.getItem("isLoggedIn"))
    : false;

export const isLoggedInSlice = createSlice({
  name: "userLogin",
  initialState: {
    isLoggedIn: loggedInState,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", state.isLoggedIn);
    },
  },
});

export const { loginUser } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
