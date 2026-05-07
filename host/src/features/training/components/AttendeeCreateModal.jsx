import React, { useEffect, useRef, useState } from 'react'

import '../Styles/AttendeeCreateModalStyles.scss'
import { Field, Form, Formik } from 'formik'
import { useAppSelector } from '../../../app/hooks'
import { selectAllProfiles, useGetProfilesQuery } from '../../profile/profileApiSlice'
import { useAddTrainingAttendeeMutation } from '../trainingApiSlice'

const AttendeeCreateModal = ({ id, setAddAttendee }) => {
    const modalref = useRef()
    const [initialValues, setInitialValues] = useState({attendee: ''})
    const { data: profiles, isSuccess, isError, error } = useGetProfilesQuery()
    const [ addTrainingAttendee, { data: attendee, error: attendeeError }] = useAddTrainingAttendeeMutation()

    useEffect(()=>{
        let handler = (e) => {
            if(!modalref.current.contains(e.target)) {
                setAddAttendee(false)
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
            setInitialValues({ attendee: '' })
        }
    },[])

    const handleOnSubmit = async (values, actions) => {
        console.log(values)
        await addTrainingAttendee({id, attendee: values}).unwrap()
        if(!attendeeError) {
            setAddAttendee(false)
        }
    }

    // isSuccess && Object.values(profiles?.entities).map((val) => {
    //     console.log(val)
    // })

    return (
        <div className='createAttendeeModal'>
            <div className='attendeeModalContainer' style={{ background: 'white', }} ref={modalref}>
                <div className='attendeeModalHeader'>
                    <h3>Add Attendee</h3>
                    <button onClick={() => { setAddAttendee(false); setInitialValues(initialValues)}}>close</button>
                </div>
                <div>
                    <Formik initialValues={initialValues} onSubmit={handleOnSubmit} enableReinitialize>
                        {({values}) => (
                            <Form>
                                <Field component="select" name="attendee" className="attendeeField">
                                    <option value="">Select an attendee</option>
                                    {
                                        isSuccess && Object.values(profiles?.entities).map((val, i) => (
                                            <option value={val.id} key={i}>{val.name}</option>
                                        ))
                                    }
                                </Field>
                                <div>
                                    <button type='submit'>ADD</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AttendeeCreateModal
