import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_URI : process.env.REACT_APP_API_PROD_URI,
    credentials: 'include',
    prepareHeaders: async ( headers, { getState }) => {
        const token = getState().auth.token
        const persist = JSON.parse(localStorage.getItem('persist'))
        if(token === null) {
            if(persist) {
                const persistToken = await JSON.parse(localStorage.getItem('user'))
                headers.set("Authorization", `Bearer ${persistToken.token}`)
            }
        } else {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    // console.log(args, api, extraOptions)

    if(result?.error?.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if(refreshResult?.data) {
            api.dispatch(setUser({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            if(refreshResult?.error?.originalStatus === 401 || refreshResult.error.status === 401) {
                refreshResult.error.data = "you login has expired. "
            }
            api.dispatch(logOut())
            return refreshResult
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Auth', 'Ncr', 'Department', 'Request'],
    endpoints: builder => ({})
})
