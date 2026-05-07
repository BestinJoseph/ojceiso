import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import './UserLayoutStyles.scss'
import UsersList from '../../features/Users/UsersList'
import UserCreate from '../../features/Users/UserCreate'

const UserLayout = () => {
    const menus = ["Create Employee", "all Employees", "Resigned Employees", "Employees On Vacation"]
    const navigate = useNavigate()
    const [select, setSelect] = useState("all")

    // console.log(select)

    return (
        <div className="userLayout">
            <div className="userContainer">
                <div className="usersMenu">
                    <h4>Employee Mgmt.</h4>
                    <div className="usersMenuItems">
                        {
                            menus && menus.map((men, i) => (
                                <li key={i} className="menuItem" onClick={() => setSelect(men.split(' ')[0])}>{men}</li>
                            ))
                        }
                    </div>
                </div>
                <div className='usersContentContainer'>
                    {
                        (() => {
                            switch(select) {
                                case 'all':
                                    return <UsersList />
                                case 'Create':
                                    return <UserCreate setSelect={setSelect} />
                                default:
                                    return <UsersList />
                            }
                        })()
                    }
                </div>
            </div>
        </div>
    )
}

export default UserLayout
