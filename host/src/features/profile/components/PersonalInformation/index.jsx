import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useUpdateMyProfilePersonalMutation } from '../../profileApiSlice'

const PersonalInformation = ({ id, personal, show }) => {
    const [ updateMyProfilePersonal, { data, isSuccess, isError, error }] = useUpdateMyProfilePersonalMutation()
    const fields = [{iqama: ''}, {mobile: ''}, {email: ''}, {passport: ''}, {expire: ''}, {dob: ''}, {placeofbirth: ''}, {country: ''}, {marital: ''}, {language: []}]
    // const [initialValues, setInitialValues] = useState({iqama: '', mobile: '', email: '', passport: '', expire: '', dob: '', placeofbirth: '', country: '', marital: '', language: []})
    const [initialValues, setInitialValues] = useState({})
    const [edit, setEdit] = useState(null)
    // console.log(personal)
    useEffect(()=>{

        if(personal) {
            setInitialValues({ [`${edit}`]: personal[edit] })
        }

        return () => {}
    },[personal, edit])

    if(show !== 'personal') return null

    if(!personal) return <p>Loading</p>

    const handleOnSubmit = async (values) => {
        await updateMyProfilePersonal({ body: values, id, target: edit})
        setEdit(null)
    }

    // console.log(personal)

    return (
        <div className='profilePersonalContainer'>
            <div className='personalFormContainer' >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)'}}>
                    {
                        fields && fields.map((field, i) => (
                            <Formik key={i} initialValues={{ [`${Object.keys(field)[0]}`]: personal[`${Object.keys(field)[0]}`] || '' }} onSubmit={handleOnSubmit} enableReinitialize>
                                {({values}) => (
                                    <div className='personalValueContainer'>
                                        <div className='valueItems'>
                                            <p>{Object.keys(field)[0]}</p>
                                            { ( edit !== Object.keys(field) && !edit ) && <p className='valueItemBtn' onClick={() => setEdit(Object.keys(field)[0])}>Edit</p> }
                                        </div>
                                        { edit === Object.keys(field)[0] ? <div>
                                            <Form>
                                                <Field type="text" name={`${edit}`} /><button type='submit'>save</button>
                                            </Form>
                                            </div> : <h3>{ personal[Object.keys(field)[0]] }</h3> }
                                    </div>
                                )}
                            </Formik>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalInformation
