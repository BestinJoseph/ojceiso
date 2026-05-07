import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { MdEdit, MdDataSaverOff, MdSave, MdOutlineCancel } from "react-icons/md"
import { useUpdateUserRoleMutation } from '../usersApiSlice'

const UserProfessionalData = ({ profile: { username, roles, branch}, id }) => {
    const [update, setUpdate] = useState({ type: "", isUpdate: false, userId: undefined })
    const componentWillUnmount = useRef(false)
    const [initialValues, setInitialValues] = useState({ roles: "", branch: "", })
    const [ updateUserRole, { isSuccess, isError, isLoading } ] = useUpdateUserRoleMutation()

    useEffect(() => {
        if(true) {
            setInitialValues({ roles, branch })
            setUpdate({ type: "", isUpdate: false, userId: undefined })
        }

        return () => componentWillUnmount.current = true
    }, [id])

    const handleSubmit = async (values, actions) => {
        // if(values.responsibilities.length > 0) {
        //     delete values.responsibilities
        // }
        // console.log(values)
        await updateUserRole({ body: values, id: id, target: update.type }).unwrap()
        // console.log(isSuccess, isLoading)
        if(isLoading === false && isSuccess) {
            setUpdate({ type: "", isUpdate: false, userId: id })
        } else {
            if(isError === false) {
                setUpdate({ type: "", isUpdate: false, userId: id })
            } else {
                console.log("there is an Error.")
            }
        }

    }

    const professionalDa = (val, type) => {
        // console.log(id)
        return <div className='profDataSubContainer'>
            <h3 className='profDataValue'>{ val }</h3>
            <div className='btnPDSC' onClick={() => setUpdate({type, isUpdate: true, userId: id})} style={{ display: update.isUpdate ? 'none' : 'inline-block'  }}>
                <MdEdit size={'1.25em'} className='btnPDSCSvg' />
            </div>
        </div>
    }

    const professionalUpdate = (position, type) => {
        return <>
                <Field type="text" value={position} className="profDataInput" name={`${type}`} />
                <button type='submit' className='btnPDU'><MdSave size={'1.5em'} style={{ display: update.isUpdate === true ? 'inline-block' : 'none' }}/></button>
                <MdOutlineCancel onClick={() => setUpdate({type: "", isUpdate: false, userId: undefined})} />
            </>
    }

    // console.log(update)

    return (
        <div className='professContainer'>
            <p className='titleContainer'>Professional Informations</p>
            <div className='profDataContainer'>
                <div className='profDataSubContainer'>
                    <p>username: </p>
                    <h3 className='profDataValue'>{ username }</h3>
                </div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                    {({values}) => (
                        <Form>
                            <div className='profDataSubContainer'>
                                <p>User Role: </p>
                                { update.isUpdate && update.type === "roles" ? professionalUpdate(values.roles, "roles") : professionalDa(roles, "roles") }
                            </div>
                            <div className='profDataSubContainer'>
                                <p>Working at: </p>
                                { update.isUpdate && update.type === "branch" ? professionalUpdate(values.branch, "branch") : professionalDa(branch, "branch") }
                            </div>
                        </Form>
                    )}
                </Formik>
                {/* { personal && personal?.responsibilities?.map((resp, i) => (<h3 key={i}>{resp}</h3>))} */}
            </div>
        </div>
    )
}

export default UserProfessionalData
