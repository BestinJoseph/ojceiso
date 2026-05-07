import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/authSliceOld'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'

import './UserDashboardStyles.scss'
import useAuth from '../../hooks/useAuth'

const UserDashboard = () => {
    const { token } = useAppSelector(selectAuth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [sendLogout, {data, isLoading, isSuccess, isError, error}] = useSendLogoutMutation()
    const { isManager, isAdmin, isSuper, status, roles } = useAuth()
    const location = useLocation()
    const [pa, setPa] = useState('dashboard')

    useEffect(()=>{
        if (isSuccess) navigate("/")
        if (location.pathname?.split('/')[2]) {
            setPa(location.pathname?.split('/')[2])
        } else [
            setPa('dashboard')
        ]
    }, [isSuccess, location])

    const handleLogout = async () => {
        sendLogout()
        if(error) {
            console.log('Signed Out')
        }
    }

    // console.log(isSuper)

    return (
        <div className='userDashboard'>
            <div className='headerContainer'>
                <div className='headerTitleContainer'>
                    <h3 className='OJCELogo'>OJCE db</h3>
                    <h4 className='headerTitleDepartment'> - </h4>
                </div>
                <div className='navContainer'>
                    <Link to="/employee" className={`navItem ${ pa === 'dashboard' ? 'active' : null}`}>Dashboard</Link>
                    <Link to="/employee/profile" className={`navItem ${ pa === 'profile' ? 'active' : null}`}>Profile</Link>
                    { isSuper && <Link to="/employee/users" className={`navItem ${ pa === 'users' ? 'active' : null}`}>Users</Link> }
                    { <Link to="/employee/requests" className={`navItem ${ pa === 'requests' ? 'active' : null}`}>Requests</Link> }
                    {/* { <Link to="/employee/departments" className={`navItem ${ pa === 'departments' ? 'active' : null}`}>Departments</Link> } */}
                    {/* { isSuper && <Link to="/employee/users" className={`navItem ${ pa === 'users' ? 'active' : null}`}>Users</Link> }
                    { (isSuper || isManager) && <Link to="/employee/equipment" className={`navItem ${ pa === 'equipment' ? 'active' : null}`}>Equipment</Link> } */}
                    {/* <Link to="/employee/ncrs" className='navItem'>Ncrs</Link> */}
                    {/* <Link to="/employee/trainings" className='navItem'>Trainings</Link>
                    <Link to="/employee/certificates" className='navItem'>Cerificates</Link> */}
                    {/* { isManager && <Link to="/employee/manager" className='navItem'>Manager</Link>}
                    { isAdmin && <Link to="/employee/manager" className='navItem'>Admin</Link>} */}
                    <button onClick={ () => handleLogout() } className="logoutBtn">logout</button>
                </div>
                <div className='hamNavContainer'></div>
            </div>
            <div className='contentContainer'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserDashboard
