import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { setNcr } from "./ncrSlice";

const ncrsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.ncr_ref === b.ncr_ref) ? 0 : a.ncr_ref ? 1 : -1
})

const initialState = ncrsAdapter.getInitialState()

export const ncrsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createNcr: builder.mutation({
            query: (body) => ({
                url:  'ncrs',
                method: 'POST',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags: [{ type: 'Ncr', id: 'LIST' }],
            transformResponse: responseData => {
                const loadedNcrs = responseData.map( ncr => {
                    ncr.id = ncr.id
                    return ncr
                })
                return ncrsAdapter.setAll(initialState, loadedNcrs)
            },
        }),
        getNcrs: builder.query({
            query: () => 'ncrs',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedNcrs = responseData.map( ncr => {
                    ncr.id = ncr.id
                    return ncr
                })
                return ncrsAdapter.setAll(initialState, loadedNcrs)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'Ncr', id: 'LIST'},
                        ...result.ids.map( id => ({ type: 'Ncr', id }))
                    ]
                } else return [{ type: 'Ncr', id: 'LIST'}]
            }
        }),
        updateNcr: builder.mutation({
            query: (initialNcrData) => ({
                url:  'ncrs',
                method: 'PATCH',
                body: { ...initialNcrData }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Ncr', id: arg.id }
            ]
        }),
    })
})

export const { useGetNcrsQuery, useCreateNcrMutation, useUpdateNcrMutation } = ncrsApiSlice

export const selectNcrsResult = ncrsApiSlice.endpoints.getNcrs.select()

const selectNcrsData = createSelector( selectNcrsResult, ncrsResult => ncrsResult.data )

export const {
    selectAll: selectAllNcrs,
    selectById: selectNcrById,
    selectIds: selectNcrIds
} = ncrsAdapter.getSelectors( state => selectNcrsData(state) ?? initialState )
