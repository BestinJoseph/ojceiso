import React from 'react'

import './Styles/DepartmentHomeStyles.scss'
import { useGetDepartmentsQuery } from './departmentApiSlice'
import Department from './components/Department'

const DepartmentHome = () => {
    let content
    const { data, isLoading, isSuccess } = useGetDepartmentsQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    if(isLoading) content = <div className='dHome'>Loading Data</div>

    if(data?.ids.length <= 0) return <div className='dHome'>No Department Found.</div>

    if(isSuccess) {
        const { ids } = data

        console.log(data)

        const requestData = data?.ids.length ? ids.map( (id, i) => <Department key={i} sn={i+1} id={id} />) : null

        content = <div className='dHome'>
            <div className='departmentListHeader'>
                <h2>List Of OJCE Departments</h2>
            </div>
            <div className='departmentsContainer'>{requestData}</div>
        </div>
    }

    return content
}

export default DepartmentHome
