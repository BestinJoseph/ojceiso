import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectUserById } from '../usersApiSlice'
import { Link } from 'react-router-dom'

import '../Styles/UserItemStyles.scss'

const UserItem = ({ id, sn, setSelectedUser, selectedUser}) => {
    const user = useAppSelector((state) => selectUserById(state, id))

    return (
        <div className="userOneContainer">
            <li onClick={() => setSelectedUser(id)} className={ selectedUser === user.id ? "listItem active" : "listItem" }>{ user?.profile.name }</li>
        </div>
    )
}

export default UserItem
