import { Field, Form, Formik } from 'formik'
import React from 'react'

const AddUserCertification = ({ id, setMode }) => {
    const initialValues = { coursename: "", }
    console.log(id)

    const handleSubmit = (values, actions) => {
        console.log(values)
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {({values}) => (
                    <Form>
                        <div>
                            <Field type="text" name="coursename" placeholder="Course Name" />
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUserCertification
