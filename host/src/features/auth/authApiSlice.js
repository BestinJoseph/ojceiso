import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setUser } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: `auth/login`,
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url:  `auth/logout`,
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err?.error.data)
                }
            }
        }),
        refresh: builder.mutation({
            query: ()=>({
                url:  `auth/refresh`,
                method: 'GET'
            }),
            transformErrorResponse: (response, meta, arg) => {
                console.log("nice..", response.status)
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data, error } = await queryFulfilled
                    const { access_token, user } = data
                    dispatch( setUser(data) )
                } catch (error) {
                    console.log("ncie......", error)
                }
            }
        })
    })
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice

// export default authApiSlice.reducer
