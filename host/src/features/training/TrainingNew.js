import React, { useState } from 'react'
import { departments } from '../../config/positions'
import { Field, Form, Formik } from 'formik'

import './Styles/TrainingNewStyles.scss'
import { Section } from './enums/sections.enum'
import { Deparments } from './enums/departments.enum'
import { useCreateTrainingMutation } from './trainingApiSlice'
import { createSearchParams, useNavigate } from 'react-router-dom'

const TrainingNew = () => {
    const [createTraining, { data, isSuccess, error }] = useCreateTrainingMutation()
    const navigate = useNavigate()
    const training = [
        { name: 'name', pholder: 'Training Name'},
        { name: 'department', pholder: 'Department Name'},
        { name:  'section', pholder: 'Section'},
        { name: 'level', pholder: 'Level'},
        { name: 'standard', pholder: 'Standard'},
        { name: 'plannedOn', pholder: 'Planned on'},
        { name: 'trainingtype', pholder: 'Type of Training'}
    ]
    const sections = ['SOIL', 'AGGREGATE', 'ASPHALT', 'CONCRETE']
    const departments = ['MATERIAL', 'CHEMICAL', 'CALIBRATION', 'SURVEY', 'GEOTECHNICAL']
    const [initialValues, setInitialValues] = useState({ name: '', department: Deparments.MATERIAL, section: Section.SOIL, level: '', standard: '', plannedOn: '', trainingtype: '' })

    const handleOnSubmit = async (values, actions) =>{
        console.log(values)
        await createTraining(values).unwrap()
        if(!error) {
            actions.resetForm()
            navigate({ pathname: '/employee/training', search: createSearchParams({ type: 'all'}).toString()})
        }
    }

    return (
        <div className='trainingNew'>
            <div className='newTrainingContainer'>
                <h3 className='trainingFormTitle'>Training Form</h3>
                <Formik initialValues={initialValues} onSubmit={handleOnSubmit} enableReinitialize>
                    {({values}) => (
                        <Form>
                            {
                                training.map((tra, i) => {
                                    if(tra.name === 'section') {
                                        return (
                                            <Field component="select" name="section" className="formField" >
                                                <option value="">Select Section</option>
                                                { sections.map((sec, j) => (
                                                    <option value={`${sec}`} key={j}>{sec}</option>
                                                ))}
                                            </Field>
                                        )
                                    } else if (tra.name === 'department') {
                                        return (
                                            <Field component="select" name="department" className="formField" >
                                                <option value="">Select Department</option>
                                                { departments.map((dep, k) => (
                                                    <option value={`${dep}`} key={k}>{dep}</option>
                                                ))}
                                            </Field>
                                        )
                                    } else {
                                        return (
                                            <Field name={`${tra.name}`} values={values[`${tra.name}`]} placeholder={tra.pholder} className="formField" />
                                        )
                                    }
                                })
                            }
                            <button type="submit">Create Training</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default TrainingNew
