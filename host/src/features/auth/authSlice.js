import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    user: {},
    token: null,
    logged: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLocalStorageUser: ( state, { payload }) => {
            state.user = payload.user
            state.token = payload.token
            state.logged = payload.logged
        },
        setUser: ( state, { payload }) => {
            localStorage.setItem("user", JSON.stringify({ token: payload.access_token, user: payload.user, logged: true }) || "{}")
            state.user = payload.user
            state.token = payload.access_token
            state.logged = true
        },
        logOut: (state, { payload }) => {
            localStorage.setItem("user", JSON.stringify({ token: null, logged: false, user: {}}))
            localStorage.setItem("persist", false)
            state.user = {}
            state.token = null
            state.logged = false
        }
    }
})

export const selectAuth = ( state ) => state.auth

export const { setUser, logOut, setLocalStorageUser } = authSlice.actions

export default authSlice.reducer
