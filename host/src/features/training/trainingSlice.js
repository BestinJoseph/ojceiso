import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    trainings: [],
    training: {}
}

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setTrainings: (state, { payload }) => {
            console.log(state)
        }
    }
})

export const selectTraining = (state) => state.training

export const { setTrainings } = trainingSlice.actions

export default trainingSlice.reducer
