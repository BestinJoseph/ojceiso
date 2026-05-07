import React, { useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { useCreateEducationMutation } from '../../usersApiSlice'

const AddUserEducation = ({ mode, id }) => {
    const [initialValues, setInitialValues] = useState({})
    const [createEducation, { isError, isSuccess, isLoading }] = useCreateEducationMutation()
    const requirements = [{name: "course", type: "select", place: "Course Name", options: []}, 
        {name: "discipline", type: "text", place: "Academic Disciplines"},
        {name: "institute", type: "text", place: "Institute of Studied"}, 
        {name: "start", type: "date", place: ""}, 
        {name: "completed", type: "date", place: ""}, 
        {name: "mark", type: "text", place: "Percentage of Mark"}, 
        {name: "region", type: "text", place: "College Location"}]

    useEffect(()=>{
        let initial = requirements.reduce((acc, cur) => {
            acc[cur.name] = ""
            return acc
        },{})

        setInitialValues({ ...initial })

        return () => {}
    },[])

    const handleSubmit = async (values, actions) => {
        console.log(values, mode)
        try {
            await createEducation({body: { ...values, location: values.region }, id})
        } catch (err) {
            console.log(err)
        }
    }

    if(!mode.active) return null

    return (
        <div className='qualification__form'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {({values}) => (
                    <Form>
                        {
                            requirements && requirements.map((requ, i) => (
                                <div key={i}>
                                    {
                                        (() => {
                                            switch (requ.type) {
                                                case "text":
                                                    return <div className='qualification__form--item' key={i}>
                                                            <p style={{ textTransform: 'capitalize'}}>{requ.name}: </p>
                                                            <Field name={requ.name} type={requ.type} className="qualification__form--item_field" />
                                                        </div>
                                                case "date":
                                                    return <div className='qualification__form--item--date' key={i}>
                                                            <p style={{ textTransform: 'capitalize'}}>{requ.name}: </p>
                                                            <Field name={requ.name} type={requ.type} className="qualification__form--item_field" />
                                                        </div>
                                                default:
                                                    return <div className='qualification__form--item' key={i}>
                                                            <p style={{ textTransform: 'capitalize'}}>{requ.name}: </p>
                                                            <Field name={requ.name} type={requ.type} className="qualification__form--item_field" />
                                                        </div>
                                            }
                                        })()
                                    }
                                </div>
                            ))
                        }
                        <button type="submit" className="qualification__form--item_btn">Add</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUserEducation
