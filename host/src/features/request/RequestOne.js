import React from 'react'
import { selectAllRequests, selectRequestById } from './requestApiSlice'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

import './Styles/RequestOneStyles.scss'
import moment from 'moment'

const RequestOne = ({reqId, sn}) => {
    const request = useAppSelector((state) => selectRequestById(state, reqId))
    const navigate = useNavigate()

    // console.log(request)
    // console.log(reqId)

    if(!request) <div className='one'>No data available</div>

    return (
        <div className='request'>
            <div className='requestItem'>
                <div>{sn}</div>
                <div>{request.requestedTo?.name}</div>
                <div>{moment(request.createdOn).format('DD MMM, YYYY HH:ss')}</div>
                <div>{request.status}</div>
                <div><button className="requestOneBtn" onClick={()=>navigate(`/employee/requests/${request.id}`)}>View</button></div>
            </div>
        </div>
    )
}

export default RequestOne
