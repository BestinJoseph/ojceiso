import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectDepartmentById, useGetDepartmentQuery } from './departmentApiSlice'
import { useParams } from 'react-router-dom'

import './Styles/DepartmentOneStyles.scss'
import DepartmentDetailed from './components/DepartmentDetailed'

const DepartmentOne = () => {
    let content
    let department
    const {id} = useParams()
    
    if(id) {
        const { data, isLoading, isSuccess } = useGetDepartmentQuery(id)
        department = data
    }

    console.log(department)

    if(department) {

        content = <div className='depOne'><DepartmentDetailed department={department} /></div>

    } else {
        content = <div className='depOne'>Something missing.</div>
    }

    return content
}

export default DepartmentOne