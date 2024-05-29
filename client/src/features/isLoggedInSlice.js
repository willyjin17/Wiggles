import { createSlice } from '@reduxjs/toolkit'

const loggedInState = localStorage.getItem('isLoggedIn') !== null ? JSON.parse(localStorage.getItem('isLoggedIn')) : false;

export const isLoggedInSlice = createSlice({
    name: "userLogin",
    initialState: {
        isLoggedIn: loggedInState
    },
    reducers: {
        loginUser : (state, action) => {
            
            console.log("Old State: " + state.isLoggedIn);
            console.log("Value: " + action.payload);
            state.isLoggedIn = action.payload;
            console.log("New State: " + state.isLoggedIn);
            localStorage.setItem('isLoggedIn', state.isLoggedIn);
        }
    } 
});

export const { loginUser } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
