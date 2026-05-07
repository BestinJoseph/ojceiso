import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useUpdateMyProfileMutation } from '../../profileApiSlice'

const Education = ({ id, educations, show}) => {
    const [create, setCreate] = useState(false)
    const [updateMyProfile, { data, isSuccess, isError, error }] = useUpdateMyProfileMutation()

    // console.log(educations)

    if(show !== 'educations') return null

    if(!educations || educations.length < 0) return <p>Loading</p>

    const handleOnSubmit = async (values, actions) => {
        await updateMyProfile({ body: values, id, target: 'educations'})
        if(isSuccess) {
            actions.resetForm()
            setCreate(false)
        }
    }

    return (
        <div className='profileEducationContainer'>
            <div className='educationContentContainer'>
                {
                    educations && educations.map((edu, i) => (
                        <div key={i}>
                            <h3>{edu.course}</h3>
                            <h4>{edu.institute}</h4>
                            <p>{edu.location}</p>
                            <p>{edu.completed}</p>
                        </div>
                    ))
                }
            </div>
            <div className='educationCreateSection' style={{ display: create ? 'block' : 'none'}}>
                <Formik initialValues={{course: '', institute: '', location: '', completed: ''}} onSubmit={handleOnSubmit} enableReinitialize>
                    {({values}) => (
                        <Form className='createForm'>
                            <div className='formHeader'>Create Education</div>
                            <Field name="course" value={values.course} placeholder="Degree and Course" className="formField" />
                            <Field name="institute" value={values.institute} placeholder="Institute Name" className="formField" />
                            <Field name="location" value={values.location} placeholder="Location of Education" className="formField" />
                            <Field name="completed" value={values.completed} placeholder="Year of Completion" className="formField" />
                            <div>
                                <button className='submitBtn' type="submit">Submit</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div onClick={() => setCreate(true)} className='createSetBtnContainer'>
                <p>Add Education</p>
            </div>
        </div>
    )
}

export default Education
