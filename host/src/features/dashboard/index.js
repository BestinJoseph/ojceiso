import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import RequestList from './components/RequestList'
import './DashboardStyles.scss'

const Dashboard = () => {
    const [forms, setForms] = useState(["Management Form", "Quality Form", "Reporting Form"])
    
    return (
        <div className='dashboard'>
            <div className='dashBoardSliderContainer'>
                <div className='dashBoardSubContainer'>
                    <div>
                        <h4>Pending Works</h4>
                    </div>
                    <div>
                        <h4>New Assigned</h4>
                    </div>
                </div>
            </div>
            <div className='dashboardContent'>
                { forms && forms.map((fm, i) => (
                    <div key={i} style={{ marginBottom: '1rem', }}>
                        <h2 style={{ fontSize: '1.8rem'}}><Link to="/employee/requests">{fm}</Link></h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
