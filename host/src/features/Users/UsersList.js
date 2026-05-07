import React, { useEffect, useState } from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import UserItem from './components/UserItem'
import UserSelectedItem from './components/UserSelectedItem'

import './Styles/UsersListStyles.scss'

const UsersList = () => {
    let content
    const { data: users, isLoading, isError, isSuccess, error } = useGetUsersQuery()
    const [selectedUser, setSelectedUser] = useState()

    useEffect(() => {
        if(users && selectedUser === undefined) {
            setSelectedUser(users?.ids[0])

            return () => {}
        }
    },[users])

    if(isError) content=<p>Error retreving users.</p>

    if(users) {
        let userlists = users.ids.length ? users.ids.map((id, i) => <UserItem id={id} selectedUser={selectedUser} setSelectedUser={setSelectedUser} key={i} sn={i+1}/>) : 'No user found.'

        content = <div className='usersList'>
            <div className='usersListContainer'>
                { userlists }
            </div>
            <div>
                <UserSelectedItem id={selectedUser} />
            </div>
        </div>
    }

    return content
}

export default UsersList
