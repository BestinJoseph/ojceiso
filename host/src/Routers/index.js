import React, { useEffect, useRef } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import _ from 'lodash'

import { HomePage, LoginPage, UserDashboard } from '../pages'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectAuth, setLocalStorageUser } from '../features/authSliceOld'
import UserRoute from './UserRoute'
import PublicRouter from './PublicRouter'
import Prefetch from '../features/auth/Prefetch'
import Profile from '../features/profile'
import Dashboard from '../features/dashboard'
import PersistLogin from '../features/auth/PersistLogin'
import { logOut, setUser } from '../features/auth/authSlice'
import Manager from '../features/manager'
import NcrLayout from '../layouts/NcrLayout'
import NcrsList from '../features/ncrs/NcrsList'
import NcrOne from '../features/ncrs/NcrOne'
import TrainingLists from '../features/training/TrainingLists'
import TrainingLayout from '../layouts/TrainingLayout/TrainingLayout'
import TrainingOne from '../features/training/TrainingOne'
import CertificateLists from '../features/certificate/CertificateLists'
import CertificateLayout from '../layouts/CertificateLayout/CertificateLayout'
import CertificateOne from '../features/certificate/CertificateOne'
import UsersList from '../features/Users/UsersList'
import UserLayout from '../layouts/UserLayout/UserLayout'
import Request from '../features/request/Request'
import RequestCreate from '../features/request/RequestCreate'
import RequestsList from '../features/request/RequestsList'
import DepartmentHome from '../features/department/DepartmentHome'
import DepartmentOne from '../features/department/DepartmentOne'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path='/' element={<PublicRouter />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
            </Route>
            <Route element={<PersistLogin />}>
                <Route element={<Prefetch />}>
                    <Route path="employee" element={<UserRoute />}>
                        <Route element={<UserDashboard />}>
                            <Route index element={<Dashboard />}/>
                            <Route path="requests" >
                                <Route index element={<Request />} />
                                {/* <Route path='lists' element={<RequestsList />} /> */}
                                <Route path='create' element={<RequestCreate />} />
                            </Route>
                            <Route path="departments" >
                                <Route index element={<DepartmentHome />} />
                                <Route path=':id' element={<DepartmentOne />} />
                            </Route>
                            <Route path="profile" element={<Profile />} />
                            {/* <Route path="ncrs" element={<NcrLayout />}>
                                <Route index element={<NcrsList />} />
                                <Route path=':id' element={<NcrOne />} />
                            </Route> */}
                            <Route path="users" element={<UserLayout />}>
                                <Route index element={<UsersList />}/>
                                <Route path=':id' element={<UsersList />} />
                            </Route>
                            {/* <Route path="trainings" element={<TrainingLayout />} >
                                <Route index element={<TrainingLists />} />
                                <Route path=':id' element={<TrainingOne />} />
                            </Route>
                            <Route path="certificates" element={<CertificateLayout />}>
                                <Route index element={<CertificateLists />} />
                                <Route path=':id' element={<CertificateOne />} />
                            </Route>
                            <Route path="manager" element={<Manager />} /> */}
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Route>
    )
)

const Routers = () => {
    const dispatch = useAppDispatch()
    const routerRef = useRef(true)
    // const user = useAppSelector(selectAuth)
    // const user = JSON.parse(localStorage.getItem('user') || "{}")

    useEffect(()=>{
        const persist = JSON.parse(localStorage.getItem('persist'))
        // console.log(routerRef.current)
        // console.log(persist)
        
        if(persist === true) {
            const user = JSON.parse(localStorage.getItem('user'))
            // console.log(user.token)
            dispatch(setUser({ access_token: user.token, user: user.user }))
        } else {
            dispatch(logOut())
        }
        // console.log(persist)
        return () => routerRef.current = false
    }, [routerRef])

    // console.log(routerRef.current)

    if(routerRef.current === false) return <p>Loading....</p>

    return <RouterProvider router={router} />
}

export default Routers
