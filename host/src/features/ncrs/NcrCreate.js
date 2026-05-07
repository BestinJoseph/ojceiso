import { Field, FieldArray, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import './NcrCreateStyles.scss'
import { useCreateNcrMutation } from './ncrsApiSlice'
import { useAppDispatch } from '../../app/hooks'
import { setNcr } from './ncrSlice'
import PreviewImages from '../../components/PreviewImages'

const NcrCreate = () => {
    const initialValues = {ncr_type: 'internal', foundOn: '30 Sep, 2024', req_std: 'ISO/ICE 17025', req_clause: '7.7.1 g', details: 'Some details missing.', significance: 'major', raisedOn: '01 Oct, 2024', department: 'material', docs: []}
    const [ createNcr, { data, isSuccess, isLoading, isError, error }] = useCreateNcrMutation()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isSuccess) {

        }

        // return () => isSuccess
    },[isSuccess])

    const handleSubmit = async (values, actions) => {
        // console.log(values)
        try {
            const { req_std, req_clause, docs, ...vals } = values
            vals.req_ref = `${req_std} ${req_clause}`
            let formData = new FormData()
            for(const [key, value] of Object.entries(vals)) {
                formData.append(`${key}`, value)
            }
            docs.forEach( doc => { formData.append("docs", doc) })
            await createNcr(formData).unwrap()
            if(!isLoading || isSuccess) {
                actions.resetForm()
                navigate({ pathname: '/employee/ncrs', search: createSearchParams({ type: 'all' }).toString()})
            } else {
                console.log('error going one')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='ncrCreate'>
            <div className='ncrCreateHeader'>
                <h3>Ncr Creator</h3>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {({ values, setFieldValue }) => (
                    <Form>
                        <label htmlFor="typeNcr" className="formFieldLabel">Type of NCR</label>
                        <Field name="ncr_type" as="select" id="typeNcr" className="formFieldSelect" style={{ maxWidth: '100%', }}>
                            <option value="">select the NCR type from dropdown</option>
                            <option value="internal">Internal Audit</option>
                            <option value="external">External Audit</option>
                            <option value="daytoday">Day to Day Activity</option>
                        </Field>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: 16}}>
                            <div>
                                <label htmlFor="significance" className="formFieldLabel">Significance</label>
                                <Field name="significance" as="select" id="significance" className="formFieldSelect" style={{ maxWidth: '100%', }}>
                                    <option value="">select the significance from dropdown</option>
                                    <option value="major">Major</option>
                                    <option value="minor">Minor</option>
                                    <option value="observation">Observation</option>
                                </Field>
                            </div>
                            <div>
                                <label htmlFor="foundOn" className="formFieldLabel">Identified On</label>
                                <Field name="foundOn" type="text" id='foundOn' className="formField" placeholder="date month, year"/>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: 16}}>
                            <div>
                                <label htmlFor="req_std" className="formFieldLabel">Requirement Reference</label>
                                <Field name="req_std" as="select" id="req_std" className="formFieldSelect" placeholder="ISO/ICE 17025 or Procedure Std.">
                                    <option value={``}>Select Requirement standard</option>
                                    <option value={`ISO/ICE 17025`}>ISO/ICE 17025</option>
                                    <option value={`OJCE-QMS`}>OJCE QMS</option>
                                    <option value={`SAC Requirement`}>SAC Requirement</option>
                                </Field>
                            </div>
                            <div>
                                <label htmlFor="req_clause" className="formFieldLabel">Requirement Reference</label>
                                <Field name="req_clause" type="text" id="req_clause" className="formField" placeholder="Clause and section"/>
                            </div>
                        </div>
                        <label htmlFor="raisedOn" className="formFieldLabel">Raised On</label>
                        <Field name="raisedOn" type="text" id="raisedOn" className="formField" placeholder="date month, year"/>
                        <label htmlFor="details" className="formFieldLabel">Details of finding</label>
                        <Field name="details" component="textarea" rows="7" id="details" className="formFieldTextArea"/>
                        <div style={{ display: 'block', marginBottom: '1rem' }} >
                            <FieldArray name="docs" render={({push, remove}) => (
                                <>
                                    { values.docs?.length !== undefined && <div className='previewContainer'>{values.docs.map( (doc, i) => <div key={i} onClick={() => remove(i)}><PreviewImages file={doc} /></div>)}</div>}
                                    <input type="file" onChange={(e) => { setFieldValue(`docs[${values.docs.length || 0}]`, e.target.files[0]); }} values={{}} />
                                </>
                            )}/>
                            {/* { console.log(values.docs) } */}
                        </div>
                        <button type="submit" className='submitBtn'>Create NCR</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NcrCreate
