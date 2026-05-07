import React, { useState } from 'react'
import { createSearchParams, Outlet, useNavigate, useParams } from 'react-router-dom'

import './TrainingLayoutStyles.scss'
import TrainingLists from '../../features/training/TrainingLists'
import TrainingNew from '../../features/training/TrainingNew'
import TrainingOne from '../../features/training/TrainingOne'

const TrainingLayout = () => {
    const trainingMenu = ['new Training', 'all training', 'scheduled training', 'completed training', 'incompleted training', 'deleted training' ]
    const navigate = useNavigate()
    const [select, setSelect] = useState('all')
    const { id } = useParams()

    const handleMenu = (item) => {
        setSelect(item.split(' ')[0])
        navigate({ pathname: '/employee/trainings', search: createSearchParams({ type: item.split(' ')[0]}).toString()})
    }

    return (
        <div className='trainingLayout'>
            <div className='trainingContainers'>
                <div className='trainingMenu'>
                    <h4>Training</h4>
                    <div className='trainingMenuItems'>
                        {
                            trainingMenu.map((menu, i) => (
                                <li style={{ background: select === menu.split(' ')[0] ? '#fffafa' : 'none'}} key={i} className='menuItem' onClick={() => handleMenu(menu) }>{menu}</li>
                            ))
                        }
                    </div>
                </div>
                <div className='trainingContentContainer'>
                    {
                        id ? <TrainingOne /> :
                            (()=>{
                                switch (select) {
                                    case 'all':
                                        return <TrainingLists />
                                    case 'new':
                                        return <TrainingNew />
                                    default:
                                        return <TrainingLists />
                                }
                            })()
                    }
                </div>
            </div>
        </div>
    )
}

export default TrainingLayout
