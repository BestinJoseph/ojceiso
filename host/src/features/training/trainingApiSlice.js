import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const trainingAdapter = createEntityAdapter({
    sortComparer: (a,b) => (a.id === b.id) ? 0 : a.id ? 1 : -1
})

const initialState = trainingAdapter.getInitialState()

export const trainingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createTraining: builder.mutation({
            query: (body) => ({
                url: `training`,
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'training', id: 'LIST'}],
            transformResponse: responseDate => {
                const loadTraining = responseDate.map( training => {
                    training.id = training.id
                    return training
                })
                return trainingAdapter.setAll(initialState, loadTraining)
            }
        }),
        getTrainings: builder.query({
            query: () => ({
                url: `training`,
                method: 'GET',
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadTrainings = responseData.map( training => {
                    training.id = training.id
                    return training
                })
                return trainingAdapter.setAll(initialState, loadTrainings)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [{ type: 'Trainings', id: 'LIST' }, ...result.ids.map(id => ({ type: 'Trainings', id}))]
                } else {
                    return [{ type: 'Trainings', id: 'LIST' }]
                }
            }
        }),
        getTrainingByID: builder.query({
            query: (id) => ({
                url: `training/${id}`,
                method: 'GET',
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                return responseData
            },
            providesTags: (result, error, arg) => {
                return [{ type: 'Training', arg }]
            }
        }),
        updateTraining: builder.mutation({
            query: ({ id, body }) => ({
                url: `training/${id}`,
                method: 'PATCH',
                body: { ...body },
            }),
            transformResponse: responseData => {
                return responseData
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Training', arg }
            ]
        }),
        addTrainingAttendee: builder.mutation({
            query: ({ id, attendee }) => ({
                url: `training/${id}/attendee`,
                method: 'POST',
                body: attendee
            }),
            transformResponse: responseData => {
                console.log(responseData)
                return responseData
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Training', arg }
            ]
        }),
        removeTrainingAttendee: builder.mutation({
            query: ({ id, attendee }) => ({
                url: `training/${id}/attendee/${attendee}`,
                method: 'DELETE'
            }),
            transformResponse: responseData => {
                return responseData
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Training', arg }
            ]
        })
    })
})

export const { useCreateTrainingMutation, useGetTrainingsQuery, useUpdateTrainingMutation, useGetTrainingByIDQuery, useAddTrainingAttendeeMutation, useRemoveTrainingAttendeeMutation } = trainingApiSlice

export const selectTrainingsResult = trainingApiSlice.endpoints.getTrainings.select()

const selectTrainingsData = createSelector( selectTrainingsResult, trainingsResult => trainingsResult.data )

export const {
    selectAll: selectAllTrainings,
    selectById: selectTrainingById,
    selectByIds: selectTrainingByIds,
} = trainingAdapter.getSelectors( state => selectTrainingsData(state) ?? initialState)
