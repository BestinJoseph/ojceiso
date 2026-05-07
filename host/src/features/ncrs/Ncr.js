import React from 'react'
import { selectAllNcrs, selectNcrById } from './ncrsApiSlice'
import { useSelector } from 'react-redux'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

import './Ncr.scss'

const Ncr = ({ ncrId, sn }) => {
    const ncr = useAppSelector( state => selectNcrById(state, ncrId))
    const navigate = useNavigate()

    const handleEdit = () => {
        if(ncr) {
            navigate({ pathname: `/employee/ncrs/${ncrId}`, search: createSearchParams({ type: 'view'}).toString()})
        }
    }

    if(!ncr) return <p>Loading</p>
    
    return (
        <div className='ncr'>
            <div className='ncrCellItem'>{sn}</div>
            <div className='ncrCellItem'>{ ncr.ncr_ref }</div>
            <div className='ncrCellItem'>{ ncr.ncr_type }</div>
            <div className='ncrCellItem'>{ ncr.department?.name }</div>
            <div className='ncrCellItem'>{ ncr.details?.length > 50 ? (ncr.details).substring(0, 45)+ '...' : ncr.details }</div>
            <div className='ncrCellItem'>{ ncr.raisedBy }</div>
            <div className='ncrCellItem'>{ ncr.foundOn?.substring(0, 12) }</div>
            <div className='ncrViewBtn' onClick={ () => handleEdit() }>View</div>
        </div>
    )
}

export default Ncr
