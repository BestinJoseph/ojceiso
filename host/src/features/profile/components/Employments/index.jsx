import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { useUpdateMyProfileMutation } from '../../profileApiSlice'


const Employments = ({ id, employements, show }) => {
    const [add, setAdd] = useState(false)
    const [updateMyProfile, { data, isSuccess, isError, error }] = useUpdateMyProfileMutation()
    const [emps, setEmps] = useState([])

    useEffect(()=>{
        if(employements) {
            setEmps([...employements].sort( (a, b) => moment(a.start).year() - moment(b.start).year()))
        }

        return () => {}
    }, [employements])

    if(show !== 'employments') return null

    if(!employements) return <p>Loading...</p>

    const handleOnSubmit = (values, actions) => {
        updateMyProfile({ body: values, id, target: 'employements'})
        if(isSuccess) {
            actions.resetForm()
            setAdd(false)
        }
    }

    // console.log(employements[0])

    return (
        <div className='profileEmployementContainer'>
            {
                emps && emps.map((emp, i) => (
                    <div key={i} className="positionItem" style={{ marginBottom: '1rem'}}>
                        <h4>{ emp.company }</h4>
                        <div className='positionItem--sub'>
                            <h4>{ emp.name }</h4>
                            <div className='positionItem--sub__innerContainer' style={{ display: 'flex', }} >
                                <p>{emp.start?.split("T")[0]}</p>
                                <p>{emp.end === null ? "continue" : emp.end?.split("T")[0]}</p>
                                <p>{ emp.region }</p>
                                <p>{ emp.country }</p>
                            </div>
                        </div>
                        
                    </div>
                ))
            }
            {/* <div style={{ display: add ? 'block' : 'none' }} className='profileEmployementFormContainer'>
                <Formik initialValues={{ company: '', start: '', end: '', position: '' }} onSubmit={handleOnSubmit} enableReinitialize>
                    {({ values }) => (
                        <Form className='formSection'>
                            <Field name="company" value={values.company} placeholder="Company Name" className="formField" />
                            <Field name="start" value={values.start} placeholder="Start On (DD/MM/YYYY)" className="formField" />
                            <Field name="end" value={values.end} placeholder="Resigned (DD/MM/YYYY)" className="formField" />
                            <Field name="position" value={values.position} placeholder="Position" className="formField" />
                            <div className='formSubmitBtnContainer'>
                                <button type="submit" className='formSubmitBtn'>submit</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div> */}
            {/* <div className='eAddBtnContainer' onClick={() => setAdd(true)}>
                <p className='eBtn'>Add</p>
            </div> */}
        </div>
    )
}

export default Employments
