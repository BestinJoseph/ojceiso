import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const certificateAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.id === b.id) ? 0 : a.id ? 1 : +1
})

const initialState = certificateAdapter.getInitialState()

export const certificateApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createCertificate: builder.mutation({
            query: (body) => ({
                url: `certificate`,
                method: 'POST',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags: [{ type: 'Certificates', id: 'LIST'}]
        }),
        getCertificates: builder.query({
            query: () => ({
                url: `certificate`,
                method: 'GET'
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadCertificates = responseData.map( cert => {
                    cert.id = cert.id
                    return cert
                })
                return certificateAdapter.setAll(initialState, loadCertificates)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [{ type: 'Certificates', id: 'LIST' }, ...result.ids.map( id => ({type: 'Certificates', id }))]
                } else {
                    return [{ type: 'Certificates', id: 'LIST' }]
                }
            }
        }),
        updateCertificate: builder.mutation({
            query: ({body, id}) => ({
                url: `certificate/${id}`,
                method: 'PATCH',
                body,
                header: {
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Certificates', id: arg.id }
            ]
        })
    })
})

export const { useCreateCertificateMutation, useGetCertificatesQuery, useUpdateCertificateMutation } = certificateApiSlice

export const selectCertificateResult = certificateApiSlice.endpoints.getCertificates.select()

const selectCertificatesData = createSelector( selectCertificateResult, certificatesResult => certificatesResult.data)

export const {
    selectAll: selectAllCertificates,
    selectById: selectCertificateById,
    selectByIds: selectCertificateByIds,
} = certificateAdapter.getSelectors( (state) => selectCertificatesData(state) ?? initialState )
