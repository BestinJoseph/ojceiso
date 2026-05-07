import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const profileAdapter = createEntityAdapter({})

const initialState = profileAdapter.getInitialState()

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createProfile: builder.mutation({
            query: (body) => ({
                url: `profile`,
                method: 'POST',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags: [{ type: 'Profile', id: 'LIST'}],
            transformResponse: responseData => {
                const loadedProfile = responseData.map( profile => {
                    profile.id = profile.id
                    return profile
                })
            }
        }),
        getProfiles: builder.query({
            query: () => ({
                url: `profile`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedProfile = responseData.map( profile => {
                    profile.id = profile.id
                    return profile
                })
                return profileAdapter.setAll(initialState, loadedProfile)
            },
            providesTags: (result, error, arg) => {
                if(result?.id) {
                    return [
                        { type: 'Profiles', id: 'LIST'},
                        ...result.ids.map( id => ({ type: 'Profile', id }))
                    ]
                } else return [{ type: 'Profiles', id: 'LIST' }]
            }
        }),
        getMyProfile: builder.query({
            query: () => ({
                url: `profile/me`,
                method: 'GET'
            }),
            transformResponse: responseData => {
                return responseData
            },
            providesTags: (result, error, arg) => {
                return [{ type: 'Profile', arg}]
            }
        }),
        updateMyProfile: builder.mutation({
            query: ({body, id, target}) => ({
                url: `profile/${id}/${target}`,
                method: 'PATCH',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            transformResponse: responseData => {
                return responseData
            },
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'Profile', arg}]
            }
        }),
        updateUserProfile: builder.mutation({
            query: ({body, id, target}) => ({
                url: `profile/${id}/${target}`,
                method: 'PATCH',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', arg }],
        }),
        updateMyProfilePersonal: builder.mutation({
            query: ({body, id, target}) => ({
                url: `profile/${id}/personal/${target}`,
                method: 'PATCH',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            transformResponse: responseData => {
                return responseData
            },
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'Profile', arg}]
            }
        }),
        updateUserProfilePosDep: builder.mutation({
            query: ({body, id, target}) => ({
                url: `profile/${id}/profile/${target}`,
                method: 'PATCH',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            transformResponse: responseData => {
                return responseData
            },
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'Profile', arg}]
            }
        }),
    })
})

export const { useCreateProfileMutation, 
    useGetProfilesQuery, 
    useGetMyProfileQuery, 
    useUpdateMyProfileMutation, 
    useUpdateUserProfileMutation, 
    useUpdateMyProfilePersonalMutation,
    useUpdateUserProfilePosDepMutation,
} = profileApiSlice

export const selectProfilesResult = profileApiSlice.endpoints.getMyProfile.select()

const selectProfilesData = createSelector(selectProfilesResult, profilesResult => profilesResult.data )

export const {
    selectAll: selectAllProfiles,
    selectById: selectProfileById,
    selectByIds: selectProfileByIds,
} = profileAdapter.getSelectors( state => selectProfilesData(state) ?? initialState)
