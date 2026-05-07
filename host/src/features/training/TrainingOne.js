import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectTrainingById, useGetTrainingByIDQuery, useRemoveTrainingAttendeeMutation, useUpdateTrainingMutation } from './trainingApiSlice'

import './Styles/TrainingOneStyles.scss'
import { Field, Form, Formik } from 'formik'
import AttendeeCreateModal from './components/AttendeeCreateModal'

const TrainingOne = () => {
    let content
    const [searchParams, setSearchParams] = useSearchParams()
    const { id } = useParams()
    const { data: training, isSuccess: isTrainingSuccess, isError: isTrainingError, error: trainingError} = useGetTrainingByIDQuery(id)
    const [edit, setEdit] = useState(null)
    const [addAttendee, setAddAttendee] = useState(false)
    const trainingDetail = ['level', 'status', 'plannedOn', 'conductedOn', 'trainingtype', 'trainer']
    const [updateTraining, { data, isSuccess, isError, error }] = useUpdateTrainingMutation()
    const [ removeTrainingAttendee, { data: removeAttendee, isSuccess: isRemoveAttendeeSuccess, error: removeAttendeeError }] = useRemoveTrainingAttendeeMutation()

    if(!training || training === undefined) content = <p>Loading...</p>

    // console.log('training', training)

    const handleEditTraining = (train) => {
        setEdit(train)
    }

    // console.log(id)

    const handleSubmit = async (values, actions) => {
        await updateTraining({ id: id, body: values }).unwrap()
        if(!error) {
            setEdit(null)
        }
    }

    const handleDeleteAttendee = async (att) => {
        await removeTrainingAttendee({ id, attendee: att }).unwrap()
        if(!removeAttendeeError) {
            console.log('remove attendee')
        }
    }

    const handleAddAttendee = async () => {

    }

    content = <div className='trainingOne'>
        <div>
            <div className='trainingOneConHead'>
                <h3 className='contentItemHeader'>{ training?.name }</h3>
            </div>
            <div className='trainingContentItems'>
                {
                    trainingDetail.map((train, i) => (
                        <div className='trainingContentItem' key={i}>
                            { edit === train ? 
                            <Formik initialValues={{ [`${train}`]: training[`${train}`]}} onSubmit={handleSubmit} enableReinitialize>
                                {({values}) => (
                                    <Form>
                                        <Field type="text" name={`${train}`} values={values[`${train}`]}/>
                                        <button type="submit">save</button>
                                    </Form>
                                )}
                            </Formik> : 
                            <div className='trainingItemInfo'>
                                <div className='trainingItemInfoKey'>
                                    <p>{train}</p>
                                    { edit === null && <p onClick={() => handleEditTraining(train)} className='trainingKeyEditBtn'>edit</p> }
                                </div>
                                <span className='contentItemValue'>{ training && training[`${train}`] }</span>
                            </div> }
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='trainingAttendees'>
            <div className='trainingAttendeesHeadContainer'>
                <h3>Attendees</h3>
                <div className='attendeeAddBtn' onClick={() => setAddAttendee(true) }>add</div>
            </div>
            <div style={{ display: addAttendee ? 'block':'none'}}>
                <AttendeeCreateModal setAddAttendee={setAddAttendee} id={id} />
            </div>
            <ul className='attendeesLists'>
                {
                    training?.attendees.map((att, i) => (
                        <li key={i} className='attendeeItem'>
                            <h3 className='attendeeItemHeader'>{ att.profile?.name }</h3>
                            <div className='attendeeItemContent'>
                                <p>{ att.profile?.position }</p>
                            </div>
                            <div className='attendeeItemFooter'>
                                <p className='itemFooterUpdate'>update</p>
                                <p className='itemFooterDelete' onClick={() => handleDeleteAttendee(att.id) }>delete</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>

    return content
}

export default TrainingOne
