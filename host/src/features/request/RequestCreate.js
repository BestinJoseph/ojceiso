import { Field, FieldArray, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './Styles/RequestCreateStyles.scss'
import forms from './formdetails'
import { set } from 'lodash'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../auth/authSlice'
import { useCreateRequestMutation } from './requestApiSlice'
import { selectAllDepartments, useGetDepartmentsQuery } from '../department/departmentApiSlice'
import { useSelector } from 'react-redux'

const RequestCreate = () => {
    // const { data: departments, isError: depError, } = useGetDepartmentsQuery({})
    const departments = useAppSelector((state) => selectAllDepartments(state))
    const [searchParams, setSearchParams] = useSearchParams()
    const [newForm, setNewForm] = useState([])
    const [initialValues, setInitialValues] = useState({ department: '', items: []})
    // const formFields = [{name: "requestor", placeholder: "Requestor For (Full Name)"}, {name: "department", placeholder: "Department To"}, [{name: "itemDescription", placeholder: "Description of Item"}, {name: "reference", placeholder: "Specification Ref."}, {name: "quantity", placeholder: "Quantity"}]]
    const [desc, setDesc] = useState({})
    let param = {}
    searchParams.forEach((val, key) => param[key] = val)
    const [self, setSelf] = useState(true)
    const { user } = useAppSelector(selectAuth)
    const [createRequest, {data, isSuccess, isError, isLoading, error}] =  useCreateRequestMutation()
    // const departments = [{id:1,name:"IT"},{id:2,name:"Calibration"},{id:3,name:"Purchase"},{id:4,name:"QMS"}]

    // console.log(param)

    useEffect(()=>{
        if(!_.isEmpty(param)) {
            forms.map((fr, i) => {
                if(fr.formName.toLocaleLowerCase() === param.formd.toLocaleLowerCase()) {
                    setNewForm([ ...fr.details ])
                    fr.details.map((va) => {
                        if(va.name === 'item') {
                            const itemss = va.data.reduce((obj, cur) => {
                                obj[cur.name] = ""
                                return obj
                            }, {})
                            setDesc(itemss)
                            setInitialValues({ ...initialValues, department: fr.department, items: [ ...initialValues.items, itemss] })
                        }
                    })
                }
            })
        }

        return () => {}
    }, [])

    if(_.isEmpty(newForm)) {
        return <h1 style={{ paddingTop: '5rem', }}>Its Loading....</h1>
    }

    const handleSubmit = async (values, actions) => {
        const dep = departments && departments.find( dd => dd.id === values.department )
        let requestData = {}
        requestData = { ...requestData, requestedTo: dep, category: param.type.toLocaleUpperCase(), requestType: param.type, data: JSON.stringify(values.items) }
        await createRequest(requestData).unwrap()
        if(isError) {
            console.log(error)
        } else {
            console.log("DATA: ....." + data)
            console.log(isSuccess)
        }
        // console.log(requestData, values)
    }

    const formMapLoop = (frm, g, values) => {
        return frm instanceof Array ? <div key={g} className='formItemLists' style={{ gridTemplateColumns: `repeat(${frm.length}, 1fr)`}}>
            {
                frm && frm.map((frms, l) => {
                    if(frms instanceof Array) {
                        formMapLoop(frms)
                    } else {
                        return <div key={l} style={{ border: '1px solid grey', padding: '2px', background: 'red', }}>
                            <label style={{ fontSize: '.9rem', marginBottom: '.75rem' }}>{frms.placeholder}</label><br />
                            <Field as="input" name={frms.name} className="formItemTextField" type="text" />
                        </div>
                    }
                })
            }
        </div> : frm.name === 'item' ? 
            <FieldArray key={g} name="items" render={ arryaHelper => (
                <>
                    <div className='itemArrayContainer'>
                        {
                            values.items && values.items.map( (itt, h) => <div key={h} className='itemContainer' >
                                    {
                                        frm.data.map((da, j) => (
                                            <div key={j} className='arrayItemField' style={{ width: '100%', }}>
                                                <label>{frm.data[j].placeholder}</label><br />
                                                <Field as="input" name={`items.${h}.${da.name}`} style={{ width: '100%'}} className="formItemTextField" type="text" />
                                            </div>
                                        ))
                                    }
                                    <div className='itemDeleteBtn' onClick={() => arryaHelper.remove(h) }>
                                        <img src='/images/plus.svg' className='itemBtnImage' width="1rem" height="1rem" />
                                    </div>
                                </div> 
                            )
                        }
                    </div>
                    <div className='itemArrayBtnPlus' onClick={() => arryaHelper.insert(g, desc) }>
                        <img src='/images/plus.svg' className='itemBtnImage' width="1rem" height="1rem" />
                    </div>
                </>
            )} />
            : (frm.name === "requestor" || frm.name === "departments") && self === true ?
                null : <div key={g} className='formItemTextFieldCover'>
                    <label style={{ fontSize: '.9rem', paddingBottom: '.75rem' }}>{frm.placeholder}</label><br />
                    {/* <Field as="input" name={frm.name} className="formItemTextField" type="text" /> */}
                    <Field as="select" className="formItemTextField" name='department' >
                        <option value="">Select Department</option>
                        {
                            departments && departments.map(( deps, g ) => (
                                <option value={`${deps.id}`} key={g}>{deps.name}</option>
                            ))
                        }
                    </Field>
                </div>
    }

    return (
        <div className='requestCreate'>
            <div style={{ display: "flex", alignItems: 'center', marginBottom: '1rem', }}>
                <h3 className='requestCreateHeader'>{param && param.formd} Requisitions </h3>
                {/* <div style={{ marginLeft: '1rem', border: '1px solid blue', borderRadius: '3px', padding: '.25rem .5rem .2rem .5rem'}} onClick={() => setSelf(!self)}>
                    <input type="checkbox" className="formItemCheckboxField" value={self} checked={self} onChange={() => setSelf(!self)} />
                    <label style={{ marginLeft: '.35rem', }}>Self</label>
                </div> */}
            </div>
            <div className='reqCreateFormContainer'>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values}) => (
                        <Form>
                            {
                                newForm && newForm.map((frm, i) => {
                                    return formMapLoop(frm, i, values)
                                })
                            }
                            <div>
                                <button type='submit' className='formItemBtn'>Submit Request</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RequestCreate
