import { Form, Formik, Field, FieldArray } from 'formik'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import { useUpdateUserExperiencesMutation } from '../../usersApiSlice'

const AddUserExperience = ({ mode, profile: { id }, setMode }) => {
    const [initialValues, setInitialValues] = useState({company: '', name: '', start: "", end: "", region: ''})
    const [updateUserExperinces, { isError, isLoading, isSuccess }] = useUpdateUserExperiencesMutation()

    useEffect(()=>{

        if(mode.active === false) {
            setInitialValues({company: '', name: '', start: "", end: "", region: ''})
        } else {
            if(mode.type === "experience") {
                if(_.isEmpty(mode.data)) {
                    setInitialValues({company: '', name: '', start: "", end: "", region: ''})
                } else {
                    setInitialValues({company: mode.data?.company, name: '', start: "", end: "", region: ''})
                }
            } else {
                console.log('???')
            }
        }

        return () => {}
    }, [mode])

    const handleSubmit = async (values, actions) => {
        const regi = values.region.split(", ")
        try {
            await updateUserExperinces({ body: { ...values, region: regi[0], country: regi[1]}, id: id, method: 'add' })
            setMode({ type: "", active: false, data: {} })
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(mode, mode.active)

    return (
        <div className="expAddFormContainer" style={{ display: mode.active && mode.type === "experience" ? "block" : "none"}}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {({ values }) => (
                    <Form>
                        <div>
                            <div className='expAddFormItem'>
                                <p>Company Name: </p>
                                <Field name="company" value={values.company} disabled={!_.isEmpty(mode.data?.company)} className="expFormItemField" />
                            </div>
                            <div className='expAddFormItem'>
                                <p>Duration: </p>
                                <div className='expFormDurItem'>
                                    <Field name="start" type="date" className="expFormItemField" />
                                    <Field name="end" type="date" className="expFormItemField" />
                                </div>
                            </div>
                            <div className='expAddFormItem'>
                                <p>Position: </p>
                                <Field name="name" placeholder="Position" className="expFormItemField" autoComplete="off" />
                            </div>
                            <div className='expAddFormItem'>
                                <p>Region and Country: *region followed by (",", "/", space) and type country</p>
                                <Field name="region" placeholder="region" className="expFormItemField" />
                            </div>
                            <button className='expBtn' type="submit">Add</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUserExperience