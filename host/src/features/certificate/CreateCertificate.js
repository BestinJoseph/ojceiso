import { Field, Formik, Form } from 'formik'
import React, { useState } from 'react'

import './Styles/CreateCertificateStyles.scss'
import { useCreateCertificateMutation } from './certificateApiSlice'
import { createSearchParams, useNavigate } from 'react-router-dom'

const CreateCertificate = () => {
    const [initialValues, setInitialValues] = useState({name: '', activatedon: '', expirydate: '', certificate: ''})
    const [doc, setDoc] = useState(null)
    const [ createCertificate, { data, isSuccess, isError, error }] = useCreateCertificateMutation()
    const navigate = useNavigate()

    const handleSubmit = async (values, actions) => {
        const { certificate, ...val} = values
        let formData = new FormData()
        for(const [key, value] of Object.entries(val)) {
            formData.append(`${key}`, value)
        }
        formData.append('certificate', certificate)
        await createCertificate(formData).unwrap()
        if(!isError) {
            actions.resetForm()
            navigate({ pathname: '/employee/certificates', search: createSearchParams({ type: 'all'}).toString()})
        }
    }

    return (
        <div className='createCertificate'>
            <div className='ccertificateContainer'>
                <h2 style={{ marginBottom: '1rem', }}>Create Cerificate</h2>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Field name="name" value={values.name} className="formField" placeholder="Certificate Name" />
                            <Field name="activatedon" value={values.activatedon} className="formField" placeholder="Valid From" />
                            <Field name="expirydate" value={values.expirydate} className="formField" placeholder="Expires On" />
                            <input name="certificate" onChange={(e) => setFieldValue('certificate', e.target.files[0])} type="file" className="formFileField"/>
                            <button type="submit" className='certificateSubmitBtn'>SUBMIT</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default CreateCertificate
