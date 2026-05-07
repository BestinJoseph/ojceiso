import React from 'react'
import { selectTrainingById } from './trainingApiSlice'
import { useAppSelector } from '../../app/hooks'

import './Styles/TrainingItem.scss'
import { createSearchParams, useNavigate } from 'react-router-dom'

const TrainingItem = ({ sn, trainingId}) => {
    const training = useAppSelector((state) => selectTrainingById(state, trainingId))
    const navigate = useNavigate()
    // console.log(training)

    const handleClick = () => {
        navigate({ pathname: `/employee/trainings/${trainingId}`, search: createSearchParams({ type: 'view' }).toString()})
    }

    if(!training) return <p>Loading...</p>

    return (
        <div className='trainingItem'>
            <div className='trainingItemContainer'>
                <p className='trainingItemText' >{ sn }</p>
                <p className='trainingItemTextNoFlex'>{ `${training.name} - ${training.section}` }</p>
                <p className='trainingItemTextNoLeftBorder'>{ training.level }</p>
                <p className='trainingItemTextNoLeftBorder'>{ training.plannedOn }</p>
                <p className='trainingItemTextNoLeftBorder'>{ training.trainingtype }</p>
                <p className='trainingItemTextNoLeftBorder'>{ training.status }</p>
                <div className='trainingViewBtn' onClick={() => handleClick() }>view</div>
            </div>
        </div>
    )
}

export default TrainingItem
