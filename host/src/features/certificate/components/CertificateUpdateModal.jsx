import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useUpdateCertificateMutation } from '../certificateApiSlice'

const CertificateUpdateModal = ({certificateData, setUpdate, update}) => {
    const modRef = useRef()
    const [initialValues, setInitialValues] = useState({ activatedon: '', expirydate: '', doc: ''})
    const [updateCertificate, { data, isSuccess, isError }] = useUpdateCertificateMutation()

    console.log(certificateData)

    useEffect(()=>{
        let handler = (e) => {
            if(!modRef.current.contains(e.target)) {
                setUpdate(false)
            }
        }

        if(certificateData) {
            setInitialValues({ activatedon: certificateData.activatedon, expirydate: certificateData.expirydate })
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    },[])

    const handleUpdateSubmit = async (values, actions) => {
        // console.log(values)
        let formData = new FormData()
        formData.append('activatedon', values.activatedon)
        formData.append('expirydate', values.expirydate)
        formData.append('certificate', values.doc)
        await updateCertificate({ body: formData, id: certificateData.id}).unwrap()
        if(!isError) {
            actions.resetForm()
            setUpdate(false)
        }
        // console.log(formData)
    }

    return (
        <div>
            <div style={{ display: update ? 'block' : 'none', width: '100%', height: '88vh', position: 'absolute', top: 0, left: 0, background: 'rgba(0, 0, 0, 0.226)'}}>
                <div ref={modRef} style={{ width: '300px', height: '400px', background: 'white', }}>
                    <Formik initialValues={initialValues} onSubmit={handleUpdateSubmit} enableReinitialize>
                        {({values, setFieldValue})=>(
                            <Form>
                                <Field name="activatedon" value={values.activatedon} />
                                <Field name="expirydate" value={values.expirydate} />
                                <input name="doc" type="file" onChange={(e) => setFieldValue('doc', e.target.files[0])} />
                                <button type="submit">Update</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default CertificateUpdateModal


