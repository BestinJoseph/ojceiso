import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    request: {},
    requests: []
}

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setRequests: ( state, { payload } ) => {
            console.log(state)
        }
    }
})

export const selectRequest = (state) => state.request

export const { setRequest } = requestSlice.actions

export default requestSlice.reducer
