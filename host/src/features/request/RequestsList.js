import React from 'react'

import './Styles/RequestsListStyles.scss'
import { useSelector } from 'react-redux'
import { selectAllDepartments } from '../department/departmentApiSlice'
import { selectAllRequests, useGetRequestsQuery } from './requestApiSlice'
import RequestOne from './RequestOne'
import { createSearchParams, Navigate, useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

const RequestsList = () => {
    let content
    const { data, isLoading, isError, isSuccess } = useGetRequestsQuery('requestsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const navigate = useNavigate()

    // console.log(data)

    if(data?.length > 0) content = <p className='lists'>Loading....</p>

    if(isError) content = <p>{ isError.message }</p>

    if(isSuccess) {
        const { ids } = data

        const requestsContent = ids?.length ? ids.map( (reqId, i) => <RequestOne key={i} sn={i+1} reqId={reqId} /> ) : null

        content = <div className='lists'>
            <div className='listsHeader'> 
                <h4>List of requests</h4>
                <MdAdd className='requestCreateBtn' onClick={() => navigate({ pathname: "/employee/requests/create", search: "?formd=ojce user&type=new"})} />
                {/* <button >Create</button> */}
            </div>
            <div>{requestsContent}</div>
        </div>
    }

    return content
}

export default RequestsList
