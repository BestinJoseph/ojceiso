import React, { useEffect } from 'react'
import { store } from '../../store'
import { authApiSlice } from './authApiSlice'
import { Outlet } from 'react-router-dom'
import { ncrsApiSlice } from '../ncrs/ncrsApiSlice'
import { trainingApiSlice } from '../training/trainingApiSlice'
import { profileApiSlice } from '../profile/profileApiSlice'
import { certificateApiSlice } from '../certificate/certificateApiSlice'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from './authSlice'
import { departmentApiSlice } from '../department/departmentApiSlice'
import { requestApiSlice } from '../request/requestApiSlice'

const Prefetch = () => {
    const { logged } = useAppSelector(selectAuth)
    
    useEffect(()=>{
        if(logged) {
            console.log('Subscribing')
            // store.dispatch(authApiSlice.endpoints.refresh)
            // const ncrs = store.dispatch(ncrsApiSlice.endpoints.getNcrs.initiate())
            // const trainings = store.dispatch(trainingApiSlice.endpoints.getTrainings.initiate())
            // const profiles = store.dispatch(profileApiSlice.endpoints.getProfiles.initiate())
            const departments = store.dispatch(departmentApiSlice.endpoints.getDepartments.initiate())
            const requests = store.dispatch(requestApiSlice.endpoints.getRequests.initiate())
            // const certificates = store.dispatch(certificateApiSlice.endpoints.getCertificates.initiate())

            // console.log(trainings)
            // console.log(profiles)
            // console.log(departments)


            return () => {
                console.log('Unsubscribing')
                // ncrs.unsubscribe()
                // trainings.unsubscribe()
                // profiles.unsubscribe()
                departments.unsubscribe()
                requests.unsubscribe()
                // certificates.unsubscribe()
            }
        }
    })

    return (
        <Outlet />
    )
}

export default Prefetch
