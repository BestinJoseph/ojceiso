import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    ncrs: []
}

export const ncrSlice = createSlice({
    name: 'ncr',
    initialState,
    reducers: {
        setNcr: (state, { payload }) => {
            console.log(state)
            // state.ncrs
        }
    }
})

export const selectNcr = ( state ) => state.ncr

export const { setNcr } = ncrSlice.actions

export default ncrSlice.reducer
