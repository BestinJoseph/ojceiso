import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/authSliceOld'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRouter = () => {
    const { logged } = useAppSelector(selectAuth)

    return logged === false ? <Outlet /> : <Navigate to="/employee" />
}

export default PublicRouter
