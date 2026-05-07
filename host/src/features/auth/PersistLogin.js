import React, { useEffect, useRef, useState } from 'react'

import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { useRefreshMutation } from './authApiSlice'
import { Link, Outlet } from 'react-router-dom'
import { selectAuth } from './authSlice'

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectAuth)
    const effectRef = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation()

    // console.log('nice boss', token)

    useEffect(()=>{
        if(effectRef.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                // console.log('verifying refresh token')
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.log(err.message)
                }
            }

            if(!token && persist) verifyRefreshToken()
        }

        return () => effectRef.current = true
    },[])

    let content

    if(!persist) {
        content = <Outlet />
    } else if ( isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = <p>{ error?.data?.message } <Link to="/login">login again</Link></p>
    } else if ( isSuccess && trueSuccess ) {
        content = <Outlet />
    } else {
        // console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin
