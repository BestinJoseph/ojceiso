import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    profile: {}
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, { payload }) => {
            console.log(state)
        }
    }
})

export const selectProfile = ( state ) => state.profile

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer
