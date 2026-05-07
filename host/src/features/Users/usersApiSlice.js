import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { method } from "lodash";

const usersAdapter = createEntityAdapter({
    sortComparer: (a,b) => (a.id === b.id) ? 0 : a.id ? 1 : -1
})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: 'users',
                method: 'GET',
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.map( user => {
                    user.username = user.username
                    return user
                })
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, tag) => {
                if(result?.Usernames) {
                    return [
                        {type: 'User', username: 'LIST'},
                        ...result.Usernames.map( username => ({ type: 'User', username}))
                    ]
                } else return [{ type: 'User', username: 'LIST'}]
            }
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: 'users/register',
                method: 'POST',
                body: user,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST'}
            ],
            // transformResponse: responseData => {
            //     console.log(responseData)
            //     const loadedUsers = responseData.map( user => {
            //         user.id = user.id
            //         return user
            //     })
            //     usersAdapter.setAll(initialState, loadedUsers)
            // }
        }),
        updateUserRole: builder.mutation({
            query: ({ body, id, target }) => ({
                url: `users/${id}/${target}`,
                method: 'PATCH',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', arg }],
        }),
        updateUserExperiences: builder.mutation({
            query: ({ body, id, method }) => ({
                url: `profile/${id}/experiences/${method}`,
                method: "PATCH",
                body,
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', arg }]
        }),
        updatePositionChange: builder.mutation({
            query: ({ body, id }) => ({
                url: `profile/position/${id}/update`,
                method: 'PATCH',
                body,
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', arg }]
        }),
        createEducation: builder.mutation({
            query: ({body, id}) => ({
                url: `profile/education/${id}/new`,
                method: 'PATCH',
                body,
                header: {
                    'Content-Type': 'mulitipart/form-data'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', arg }]
        })
    })
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserRoleMutation, useUpdateUserExperiencesMutation, useUpdatePositionChangeMutation, useCreateEducationMutation } = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector( selectUsersResult, usersResult => usersResult.data )

export const { 
    selectAll: selectAllUsers, 
    selectById: selectUserById, 
    selectIds: selectUserIds 
} = usersAdapter.getSelectors( state => selectUsersData(state) ?? initialState )
