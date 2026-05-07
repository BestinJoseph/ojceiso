import React from 'react'

import '../Styles/DepartmentDetailedStyles.scss'

const DepartmentDetailed = ({ department }) => {
    return (
        <div className='depDetailed'>
            <h1 className='depDetiledHeader'>{ department.name }</h1>
            <div className='depPersonals'>
                <h3 className='personalTitle'>Personals</h3>
                <div className='personalsSubLevel'>
                    <div>Manager</div>
                    <div>Deputy Manager</div>
                </div>
                <div className='personalsSubLevel'>
                    <div>Technical Manager</div>
                </div>
                <div className='personalsSubLevel'>
                    <div>Soil Supervisor</div>
                    <div>Aggregate Supervisor</div>
                    <div>Asphalt Supervisor</div>
                    <div>Concrete Supervisor</div>
                </div>
                <div className='personalsSubLevel'>
                    <div>Project Coordinator</div>
                    <div>Sr Administrator</div>
                    <div>Administrator</div>
                    <div>Administrator</div>
                </div>
                <div className='personalsSubLevel'>
                    <div>Technicians</div>
                </div>
                <div className='personalsSubLevel'>
                    <div>Assitant Technicians</div>
                </div>
            </div>
        </div>
    )
}

export default DepartmentDetailed
