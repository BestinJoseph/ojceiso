import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'
import { dotenv } from 'dotenv-webpack'

// const isHydrateAction = (action) => {
//     console.log(action)
//     return true
// }

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NODE_ENV === "development" ? process.env.REACT_APP_APIP_URI : process.env.REACT_APP_API_PROD_URI
    }),
    // extractRehydrationInfo: (action, { reducerPath }) => {
    //     if(isHydrateAction(action)) {
    //         return action.payload[ApiProvider.reducerPath]
    //     }
    // },
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body
            })
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: 'logout',
                method: 'POST',
                body
            })
        })
    })
})

export const { useLoginUserMutation } = authApi
