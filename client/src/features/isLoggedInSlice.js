import { createSlice } from '@reduxjs/toolkit'

export const isLoggedInSlice = createSlice({
    name: "userLogin",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        loginUser : (state, action) => {
            
            console.log("Old State: " + state.isLoggedIn);
            console.log("Value: " + action.payload);
            state.isLoggedIn = action.payload;
            console.log("New State: " + state.isLoggedIn);
        }
    } 
});

export const { loginUser } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
