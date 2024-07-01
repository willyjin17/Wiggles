import { createSlice } from "@reduxjs/toolkit";

export const isLoggedInSlice = createSlice({
  name: "userLogin",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { loginUser } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
