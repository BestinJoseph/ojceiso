import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: null,
    logged: false
}

export const authSliceOld = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setLocalStorageUser: ( state, { payload }) => {
            state.user = payload.user
            state.token = payload.token
            state.logged = payload.logged
        },
        setUser: ( state, { payload }) => {
            localStorage.setItem("user", JSON.stringify({ ...payload, logged: true }))
            state.user = payload.user
            state.token = payload.token
            state.logged = true
        },
        logout: (state, { payload }) => {
            localStorage.setItem("user", JSON.stringify({ token: null, logged: false, user: {}}))
            state.user = {}
            state.token = null
            state.logged = false
        }
    }
})

export const selectAuth = ( state ) => state.auth

export const { setUser, logout, setLocalStorageUser } = authSliceOld.actions

export default authSliceOld.reducer
