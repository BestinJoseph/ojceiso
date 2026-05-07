import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { MdOutlineClose, MdOutlineAdd } from 'react-icons/md'
import { BiEdit } from "react-icons/bi"
import { RiSaveLine } from "react-icons/ri"

import '../../Styles/UserExperienceSectionStyles.scss'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useUpdatePositionChangeMutation, useUpdateUserExperiencesMutation } from '../../usersApiSlice'
import AddUserExperience from './AddUserExperience'

const UserExperienceSection = ({ employee: { profile, id }, mode, setMode }) => {
    const [ updateUserExperinces, { isLoading, isError, isSuccess }] = useUpdateUserExperiencesMutation()
    let exper = _.groupBy(profile.positions, 'company')
    const [edit, setEdit] = useState({ act: false, id: null })
    const [updatePositionChange, { isLoading: posLoading, isSuccess: posSuccess }] = useUpdatePositionChangeMutation()
    const [initialValues, setInitialValues] = useState({ region: "", country: "", end: new Date().toISOString().split("T")[0] })

    useEffect(() => {
        if(edit.act === true && edit.id !== null ) {
            const position = profile.positions.find( (pos) => pos.id === edit.id )
            // console.log(position.end.toISOString())
            setInitialValues({ region: position.region, country: position.country, end: (position.end || new Date().toISOString()).split("T")[0] })
        }

        return () => {}
    }, [edit])

    // console.log(profile.positions)
    // console.log(_.groupBy(profile.positions, 'company'))

    const handleEdit = (posId) => {
        if(edit === true) {
            setEdit({ act: false, id: null })
        }
        setEdit({ act: true, id: posId })
    }

    const handleSubmit = async (values, action) => {
        try {
            await updatePositionChange({ body: values, id: edit.id })
            setEdit({ act: false, id: null })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='uExperience'>
            <div className='uExperienceContainer' style={{ display: mode.active ? "none" : "block"}}>
                {
                    Object.entries(exper).map(([key, post], i) => (
                        <div className='uExperienceItem' key={i}>
                            <h4>{ key }</h4>
                            {
                                post.map((pos, j) => (
                                    <div key={j}>
                                        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                                            {({values}) => (
                                                <Form>
                                                    <li className='employerListItem' >
                                                        <h4>{ pos?.name }</h4>
                                                        <div className='employerListItemCompanyProps'>
                                                            <p>{pos?.start.split("T")[0]}</p>
                                                            { edit.id === pos.id && edit.act ?
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Field type='date' name="end" value={ values.end } />
                                                                    </div>
                                                                :  <p>
                                                                    <span onClick={ () => setEdit(pos.id) }>
                                                                        { pos?.end === null ? "current" : pos?.end.split("T")[0]  }
                                                                    </span>
                                                                    {/* <span style={{ display: pos?.end === null ? "inline-block" : "none" }} className='experiensStyle'>*</span> */}
                                                                </p> 
                                                            }
                                                            <p>{pos?.region }</p>
                                                            <p>{pos?.country}</p>
                                                        </div>
                                                        <div className='updateExperience'>
                                                            <div style={{ display: edit.act === true && edit.id === pos.id ? "inline-block" : "none" }}>
                                                                <button type="submit"><RiSaveLine fontSize={25} className='iconSaveStyles' /></button>
                                                                <MdOutlineClose fontSize={25} className='iconsStyles' onClick={() => setEdit({ act: false, id: null })}/>
                                                            </div>
                                                            <div style={{ display: edit.act === false || edit.id !== pos.id ? "inline-block" : "none" }} >
                                                                <BiEdit onClick={()=>handleEdit(pos.id)} fontSize={25} className='iconsStyles' />
                                                                <MdOutlineAdd fontSize={25} className='iconsAddStyles' onClick={() => setMode({ type: "experience", active: true, data: { company: pos.company }})} />
                                                            </div>
                                                        </div>
                                                    </li>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div style={{ display: mode.active ? "block" : "none" }}><AddUserExperience mode={mode} profile={profile} setMode={setMode} /></div>
        </div>
    )
}

export default UserExperienceSection
