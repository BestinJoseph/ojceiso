import React, { useEffect, useRef, useState } from 'react'

import './Styles/NcrUpdateFormStyles.scss'
import { Field, Form, Formik, swap } from 'formik'
import { selectNcrById, useUpdateNcrMutation } from './ncrsApiSlice'
import { useAppSelector } from '../../app/hooks'
import { createSearchParams, useNavigate } from 'react-router-dom'

const NcrImmediateUpdateForm = ({ params, rawaction }) => {
    const ncr = useAppSelector( state => selectNcrById(state, params))
    const navigate = useNavigate()
    const [updateNcr, { data, isSuccess, isLoading, isError, error }] = useUpdateNcrMutation()
    const allFields = [
        { action: 'immediateAction', fields: [{ name: 'iaction', placeholder: 'Immplemented Correction Details', type: 'textarea'}, { name: 'correctedBy', placeholder: 'Corrected by', type: 'text'}, { name: 'correctedOn', placeholder: 'Corrected On',  type: 'text'}]},
        { action: 'correctiveAction', fields: [{name: 'routecause', placeholder: 'Root cause', type: 'textarea'}, {name: 'caction', placeholder: 'Corrective Action / Preventive Action / Recommendation', type: 'textarea'}, {name: 'approvedBy', placeholder: 'Approved by', type: 'text'}, {name: 'implementedBy', placeholder: 'Implemented by', type: 'text'}, {name: 'implementedOn', placeholder: 'Implemented on', type: 'text'}]},
        { action: 'verification', fields: [{name: 'effectiveness', placeholder: 'Details of verification after implementaion of corrective and preventive action', type: 'textarea'}, {name: 'verifiedBy', placeholder: 'verified by', type: 'text'}, {name: 'verifiedOn', placeholder: 'Verified on', type: 'text'}, {name: 'acceptence', placeholder: 'Closed-Out Accepted', type: true}, {name: 'communicated', placeholder: 'Communication required? (if yes, check / no-check)', type: false}, {name: 'communication', placeholder: 'Detail of Communication', type: 'textarea'}, {name: 'informedBy', placeholder: 'Informed By', type: 'text'}, {name: 'informedOn', placeholder: 'Informed on', type: 'text'}]}
    ]
    const isSubscribed = useRef()
    const [initialValues, setInitialValues] = useState({})
    const [formValue, setFormValue] = useState([])
    const action = rawaction?.split(' ')[0] || rawaction

    useEffect(()=>{
        (async () => {
            try {
                allFields.map( field => {
                    if(field.action === action) {
                        const ivObj = field.fields.reduce((obj, val) => ({...obj, [val.name]: ''}), {})
                        setInitialValues({ ...ivObj })
                        setFormValue(prev => ([ ...field.fields ]))
                    }
                })
            } catch (err) {
                console.log(err)
            }
        })()

        return () => {}
    },[action])

    if(_.isEmpty(initialValues) ) return <p>loading....</p>

    const handleSubmit = async (values, actions) => {
        const uValues = {action, data: values, ncrId: ncr.id}
        try {
            const data = await updateNcr(uValues).unwrap()
            if(!isLoading || isSuccess || !_.isEmpty(data)) {
                actions.resetForm()
                navigate({ pathname: `/employee/ncrs/${params}`, search: createSearchParams({ type: 'view'}).toString() })
            } else {
                console.log('error')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='ncrUpdate' style={{ paddingTop: '1rem', }}>
            <div className='ncrUpdateHeader'>
                <h2 style={{ textTransform: 'uppercase' }}>{ action !== 'verification' ? `${action} action` : action } Form</h2>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({values}) => (
                    <Form>
                        {
                            formValue && formValue.map((formval, i) => {
                                if( formval.type === 'textarea' ) {
                                    return (
                                        <div key={i} >
                                            <label htmlFor={`${formval.name}`} className='formFieldLabel' >{formval.placeholder}</label>
                                            <Field component='textarea' id={`${formval.name}`} rows="7" value={values[formval.name]} name={`${formval.name}`} className="formFieldTextArea"/>
                                        </div>
                                    )
                                } else if ( formval.type === 'text' ) {
                                    return (
                                        <div key={i}>
                                            <label htmlFor={`${formval.name}`} className='formFieldLabel' >{formval.placeholder}</label>
                                            <Field type='text' id={`${formval.name}`} value={`${values[formval?.name]}`} name={`${formval.name}`} className="formField"/>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={i} className='formFieldCheckBox'>
                                            <Field type='checkbox' checked={values[formval.name]} value={values[formval.name]} name={`${formval?.name}`} className="formCheckBox"/>
                                            <label htmlFor={`${formval.name}`}>{formval.placeholder}</label>
                                        </div>
                                    )
                                }
                            })
                        }
                        <button type='submit' className='submitBtn'>submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NcrImmediateUpdateForm
