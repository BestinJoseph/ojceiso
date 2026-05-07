import React, { useEffect, useState } from 'react'

import {styles} from './Styles/UpdateNcrStyles'
import { useAppSelector } from '../../app/hooks'
import { selectNcrById } from './ncrsApiSlice'
import { useNavigate } from 'react-router-dom'
import NcrImmediateUpdateForm from './NcrImmediateUpdateForm'

const UpdateNcr = ({ params }) => {
    // const ncr = useAppSelector( state => selectNcrById(state, params))
    // const [action, setAction] = useState('immediate')
    // const navigate = useNavigate()

    // useEffect(()=>{
    //     let isSubscribed = true

    //     if(ncr && isSubscribed) {
    //         if(ncr.immediateAction === null) {
    //             setAction('immediateAction')
    //         } else if(ncr.correctiveAction === null) {
    //             setAction('correctiveAction')
    //         } else if (ncr.verification === null) {
    //             setAction('verification')
    //         } else {
    //             navigator(-1)
    //         }
    //     }

    //     return () => isSubscribed = false
    // },[ncr])

    // if(!ncr) return <p>Loading ...</p>
    
    // return (
    //     <div style={styles.updateNcr}>
    //         <NcrImmediateUpdateForm action={action} ncr={ncr} />
    //     </div>
    // )
    return <p>cool</p>
}

export default UpdateNcr
