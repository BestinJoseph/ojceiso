import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { method } from "lodash";

const departmentAdapter = createEntityAdapter({
    sortComparer: (a,b) => (a.id === b.id) ? 0 : a.id ? 1 : -1
})

const initialState = departmentAdapter.getInitialState()

export const departmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createDepartment: builder.mutation({
            query: (body) => ({
                url: "/departments",
                method: "POST",
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags:  (result, error, arg) => [{ type: 'Department', arg}],
            transformResponse: (responseDate) => {
                const loadDepartments = responseDate.map((resp) => {
                    departments.id = resp.id
                    return departments.id
                })
                return departmentAdapter.setAll( initialState, loadDepartments )
            }
        }),
        getDepartments: builder.query({
            query: () => ({
                url: '/departments',
                method: 'GET',
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadDepartments = responseData.map((department) => {
                    department.id = department.id
                    return department
                })
                return departmentAdapter.setAll( initialState, loadDepartments )
            },
            providesTags: (result, error, tag) => {
                if(result?.ids) {
                    return [...result.ids.map( id => ({ type: 'Department', id })), { type: 'Department', id: "LIST" }]
                } else {
                    return [{ type: 'Department', id: "LIST" }]
                }
            }
        }),
        getDepartment: builder.query({
            query: (id) => ({
                url: `/departments/${id}`,
                method: "GET"
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: (response, meta, arg) => response
        })
    })
})

export const { useGetDepartmentsQuery, useCreateDepartmentMutation, useGetDepartmentQuery } = departmentApiSlice

export const selectDepartmentResult = departmentApiSlice.endpoints.getDepartments.select()

const selectDepartmentsData = createSelector(selectDepartmentResult, departmentResult => departmentResult.data )

export const {
    selectAll: selectAllDepartments,
    selectById: selectDepartmentById,
    selectByIds: selectDepartmentByIds
} = departmentAdapter.getSelectors( state => selectDepartmentsData(state) ?? initialState )
