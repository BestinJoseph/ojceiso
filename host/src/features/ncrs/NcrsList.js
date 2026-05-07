import React, { useEffect, useRef } from 'react'
import { useGetNcrsQuery } from './ncrsApiSlice'
import Ncr from './Ncr'

import './NcrsListStyles.scss'

const NcrsList = ({ action }) => {
    let content
    const unMounted = useRef(false)
    const { data: ncrs, error, isSuccess, isError} = useGetNcrsQuery('ncrsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    if (ncrs?.data?.length > 0) content = <p>Loading...</p>

    if(ncrs?.isError) {
        content = <p>{ error?.data?.message }</p>
    }

    if(isSuccess) {
        const { ids } = ncrs

        const ncrsContent = ids?.length ? ids.map( (ncrId, i) => <Ncr key={i} sn={i + 1} ncrId={ncrId}/>) : null

        content = <div className='ncrslist'>
            <div className='ncrslistHeaderBar'>
                <div className='ncrHeaderCell'>SN.</div>
                <div className='ncrHeaderCellDetails'>NCR Ref. No.</div>
                <div className='ncrHeaderCell'>Type</div>
                <div className='ncrHeaderCell'>Department</div>
                <div className='ncrHeaderCellDetails'>Details</div>
                <div className='ncrHeaderCell'>Created By</div>
                <div className='ncrHeaderCell'>Next Update</div>
                <div className='ncrHeaderCell'>Updated</div>
            </div>
            <div>{ ncrsContent }</div>
        </div>
    }

    return content
}

export default NcrsList
