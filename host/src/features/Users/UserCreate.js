import React from 'react'

import './Styles/UserCreateStyles.scss'
import { Field, Form, Formik } from 'formik'
import { useCreateUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'

const UserCreate = ({ setSelect }) => {
    const initialValues = {fname: '', pass: '123456', username: ''}
    const [createUser, { isError, isSuccess }] = useCreateUserMutation()
    const navigate = useNavigate()

    const handleSubmit = async (values, actions) => {
        if(values) {
            values.password = values.pass
            values.name = values.fname
            delete values.pass
            try {
                const dat = await createUser(values).unwrap()
                if(dat) {
                    navigate({ pathname: '/employee/users' })
                    setSelect("all Employees")
                    actions.resetForm()
                }
            } catch (error) {
                console.log("Err:", error)
            }
        } else {
        }
    }

    return (
        <div className="uCreate">
            <div className="userCreateFormContainer">
                <h4 className="userCreateHeader">Create user</h4>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                    {({values}) => (
                        <Form className="userForm" autoComplete='off'>
                            <div className="formFieldGrp">
                            </div>
                            <Field name="fname" value={values.fname} placeholder="Full Name" className="formField" />
                            <Field type="text" value={values.username} name="username" placeholder="Username" className="formField" />
                            <Field type="password" value={values.pass}  name="pass" placeholder="Secret" className="formField" />
                            <button type="submit" className="createBtn" >Create User</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default UserCreate
