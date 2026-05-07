import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice'

const useAuth = () => {
    const { token } = useSelector(selectAuth)
    let isManager = false
    let isAdmin = false
    let isSuper = false
    let status = "employee"
    
    if(token) {
        const decode = jwtDecode(token)
        const { username, roles, department } = decode
        // console.log(decode)
        isManager = roles.includes('MANAGER')
        isAdmin = roles.includes('ADMIN')
        isSuper = roles.includes('SUPER')

        if(isManager) status = 'Manager'
        if(isAdmin) status = 'Admin'

        return { username, roles, isSuper, isAdmin, isManager, status, department}
    }

    return { username: '', roles: [], isSuper, isAdmin, isManager, status, department: null }
}

export default useAuth
