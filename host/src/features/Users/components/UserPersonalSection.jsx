import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useUpdateMyProfilePersonalMutation, useUpdateUserProfileMutation } from '../../profile/profileApiSlice'
import { useAppSelector } from '../../../app/hooks'
import { selectAllDepartments } from '../../department/departmentApiSlice'

const UserPersonalSection = ({ profile: { personal, name, id, position, department } }) => {
    const [editer, setEditer] = useState()
    const [initialValues, setInitialValues] = useState()
    const dataa = ["name", "position", "department", "iqama", "mobile", "email", "passport", "expire", "dob", "placeofbirth", "country", "language"]
    const [ updateUserProfile, { isSuccess, isLoading, isError, data } ] = useUpdateUserProfileMutation({ fixedCacheKey: 'shared-update-personal', })
    const departments = useAppSelector((state) => selectAllDepartments(state))

    useEffect(()=>{
        if(personal) {
            if(initialValues && initialValues.name !== name) {
                setInitialValues({ ...personal, name, position, department: department?.name || "" })
                setEditer()
            } else {
                setInitialValues({ ...personal, name, position, department: department?.name || "" })
            }
        }

        return () => {}
    },[personal, data])

    const handleEditer = (ed) => {
        // console.log(confirm("Press a button!"))
        if(editer !== undefined ) {
            let cons = confirm("Please cancel previous action.")
            if(cons) {
                setEditer(ed)
            }
        } else {
            setEditer(ed)
        }
    }

    const handleSubmit = async (values, actions) => {
        // console.log(values[editer])
        // switch(editer) {
        //     case "name":
        //         break;
        //     case "position":
        //         break;
        //     case "department":
        //         break;
        //     default:
        //         await updateUserProfile({ body: {[editer]: values[editer]}, id, target: editer})
        // }
        await updateUserProfile({ body: {[editer]: values[editer]}, id, target: editer})
        if(isLoading === true || isSuccess) {
            setEditer()
        } else {
            if(isError) {
                console.log('error!!!!!')
            } else {
                console.log("error....")
                setEditer()
            }
        }
    }

    return (
        <div className='userPersonalSection'>
            <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
                {({values}) => (
                    <Form>
                        {
                            dataa && dataa.map((da, i) => {
                                return <div className='personalItems' key={i}>
                                    <p>{`${da}`}</p>
                                    { `${da}` === editer ? <div>
                                        {
                                            (()=>{
                                                switch (da) {
                                                    case "name":
                                                        return <div>
                                                            <Field name={`${da}`} value={values[`${da}`]} placeholder="" className="personalField" />
                                                            <button className="personalFieldCancelBtn" type="submit">Save</button>
                                                            <a className="personalFieldCancelBtn" onClick={() => setEditer()}>cancel</a>
                                                        </div>
                                                    case "department":
                                                        console.log(values[`${da}`])
                                                        return <div>
                                                            <Field as="select" name={`${da}`} className="personalField">
                                                                { departments && departments.map( (dep, i) => (
                                                                    <option value={dep.id} key={i}>{dep.name}</option>
                                                                ))}
                                                            </Field>
                                                            <button className="personalFieldCancelBtn" type="submit">Save</button>
                                                            <a className="personalFieldCancelBtn" onClick={() => setEditer()}>cancel</a>
                                                        </div>
                                                    default:
                                                        return <div>
                                                            <Field name={`${da}`} value={values[`${da}`]} placeholder="" className="personalField" />
                                                            <button className="personalFieldCancelBtn" type="submit">Save</button>
                                                            <a className="personalFieldCancelBtn" onClick={() => setEditer()}>cancel</a>
                                                        </div>
                                                }
                                            })()
                                        }
                                        </div> : <div>
                                            {(()=>{
                                                switch (da) {
                                                    case "name":
                                                        return <h3 className='presonalItemsContent'>{ name }</h3>
                                                    case "position":
                                                        return <h3 className='presonalItemsContent'>{ position }</h3>
                                                    case "department":
                                                        return <h3 className='presonalItemsContent'>{ department?.name }</h3>
                                                    case "dob":
                                                        return <h3 className='presonalItemsContent'>{ personal[`${da}`]?.split("T")[0].slice(1) }</h3>
                                                    default:
                                                        return <h3 className='presonalItemsContent'>{ personal[`${da}`] }</h3>
                                                }
                                            })()}
                                            <a onClick={() => handleEditer(`${da}`)} className="personalFieldUpdateBtn" >update</a>
                                        </div> }
                                </div>
                            })
                        }
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UserPersonalSection
