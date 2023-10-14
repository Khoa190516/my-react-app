import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: 'profileMenu',
    initialState:{
        loggedIn: false
    },
    reducers:{
        login:(state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        }
    }
})

export const {login, logout} = navbarSlice.actions

export default navbarSlice.reducer