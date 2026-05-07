import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/authSliceOld'

const UserRoute = () => {
    const { logged } = useAppSelector(selectAuth)

    // console.log(logged)

    return logged ? <div style={{ minHeight: '100vh', }}>
        <Outlet />
        </div> : <Navigate to="/login" />
}

export default UserRoute
