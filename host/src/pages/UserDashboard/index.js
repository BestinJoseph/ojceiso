import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/authSliceOld'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { FaUserCircle } from "react-icons/fa"

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
    const [proOn, setProOn] = useState(false)
    const modalRef = useRef(null)

    useEffect(()=>{
        if (isSuccess) navigate("/")

        if (location.pathname?.split('/')[2]) {
            setPa(location.pathname?.split('/')[2])
        } else [
            setPa('dashboard')
        ]

        document.addEventListener('mousedown', handleOutsideClick)

        return () => { document.removeEventListener('mousedown', handleOutsideClick)}

    }, [isSuccess, location, proOn])

    const handleLogout = async () => {
        sendLogout()
        if(error) {
            console.log('Signed Out')
        }
    }

    const handleOutsideClick = (e) => {
        if(modalRef.current && !modalRef.current.contains(e.target)) {
            setProOn(!proOn)
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
                    <div className="useAccountContainer" style={{ }}>
                        <div className="useIcon" style={{ }}><FaUserCircle onClick={() => setProOn(!proOn) } fontSize={'30'}/></div>
                        { proOn === false ? <></> :
                            <div className="userOptionContainer" ref={modalRef}>
                                <div style={{ color: 'black', textAlign: 'left', padding: '1rem 0 1rem .65rem'}}>
                                    <h5 style={{ marginBottom: '8px', }}>Bestin Joseph</h5>
                                    <p>Quality Incharge - Mgmt</p>
                                </div>
                                <button onClick={() => { navigate('/employee/profile'), setProOn(!proOn)}} className={`navItemProfile ${ pa === 'profile' ? 'active' : null}`}>Profile</button>
                                <button onClick={ () => handleLogout() } className="navItemProfile">logout</button>
                            </div>
                        }
                    </div>
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
