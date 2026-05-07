import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const employeeAdapter = createEntityAdapter({})

const initialState = employeeAdapter.getInitialState()

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.map( user => {
                    user.id = user._id
                    return user
                })
                return employeeAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if( result.ids ) {
                    return [
                        { type: 'Employee', id: 'LIST'},
                        ...result.ids.map( id => ({ type: 'Employee', id }))
                    ]
                } else return [{ type: 'Employee', id: 'LIST' }]
            }
        })
    })
})

export const { useGetProfileQuery } = employeeApiSlice

export const selectEmployeesResult = employeeApiSlice.endpoints.getProfile.select()

const selectEmployeesData = createSelector( selectEmployeesResult, employeesResult => employeesResult.data )

export const { selectAll: selectAllEmployees, selectByID: selectEmployeeById, selectIds: selectEmployeeByIds } = employeeAdapter.getSelectors( state => selectEmployeesData(state) ?? initialState )
