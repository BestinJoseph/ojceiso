import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const requestAdapter = createEntityAdapter({
    sortComparer: (a,b) => (a.id === b.id) ? 0 : a.id ? 1 : -1
})

const initialState = requestAdapter.getInitialState()

export const requestApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createRequest: builder.mutation({
            query: (body) => ({
                url: '/requests',
                method: 'POST',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags: [{ type: 'requests', id: 'LIST' }],
            // transformResponse: (responseData) => {
            //     const loadRequests = responseData.map((resp) => {
            //         request.id = resp.id
            //         return request
            //     })
            //     return requestAdapter.setAll( initialState, loadRequests )
            // }
        }),
        getRequests: builder.query({
            query: () => ({
                url: '/requests',
                method: 'GET'
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadRequests = responseData?.map((resp) => {
                    resp.id = resp.id
                    return resp
                })
                return requestAdapter.setAll(initialState, loadRequests)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'Request', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Request', id}))
                    ]
                } else {
                    return [{ type: 'Request', id: 'LIST' }]
                }
            }
        }),
        getRequest: builder.query({
            query: () => ({
                url: `/requests/${id}`,
                method: 'GET'
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadRequests = responseData?.map((resp) => {
                    resp.id = resp.id
                    return resp
                })
                return requestAdapter.setAll( initialState, loadRequests )
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [...result.ids.map(id => ({ type: 'Request', id})), { type: 'Request', id: 'LIST' }]
                } else {
                    return [{ type: 'Request', id: 'LIST' }]
                }
            }
        })
    })
})

export const { useCreateRequestMutation, useGetRequestsQuery, useGetRequestQuery } = requestApiSlice

export const selectRequestsResult = requestApiSlice.endpoints.getRequests.select()

const selectRequestsData = createSelector(selectRequestsResult, requestsResult => requestsResult.data )

export const {
    selectAll: selectAllRequests,
    selectById: selectRequestById,
    selectByIds: selectRequestByIds
} = requestAdapter.getSelectors( state => selectRequestsData(state) ?? initialState )
