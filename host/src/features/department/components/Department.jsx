import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectDepartmentById } from '../departmentApiSlice'
import { useNavigate } from 'react-router-dom'

import '../Styles/DepartmentStyles.scss'

const Department = ({sn, id}) => {
    const depart = useAppSelector((state) => selectDepartmentById(state, id))
    const navigate = useNavigate()

    return (
        <div className='depContainer'>
            <div>
                <h3 className='depName'>{ depart?.name }</h3>
                <p>{depart.createdOn.split("T")[0]}</p>
            </div>
            <button className='depFindMore' onClick={() => navigate(`/employee/departments/${id}`)}>find more</button>
        </div>
    )
}

export default Department
