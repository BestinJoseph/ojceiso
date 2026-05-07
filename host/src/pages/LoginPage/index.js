import React, { useEffect, useRef } from 'react'
import { Formik, Form, Field } from 'formik'

import './LoginPageStyles.scss'
// import { useLoginUserMutation } from '../../services/AuthApi'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { setUser } from '../../features/auth/authSlice'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import usePresist from '../../hooks/usePersist'

const LoginPage = () => {
    const userRef = useRef()
    const errRef = useRef()
    const initialValues = { username: '', password: '', persist: false}
    // const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError}] = useLoginUserMutation()
    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [persist, setPersist] = usePresist()

    const handleSubmit = async ( {username, password, persist} = values, actions) => {
        try {
            const { user, access_token } = await login({username, password}).unwrap()
            dispatch(setUser({ user: user, access_token }))
            localStorage.setItem('persist', persist)
            actions.resetForm()
            navigate('/employee')
        } catch (err) {
            console.log(err)
        }   
    }

    useEffect(()=>{
        const pers = JSON.parse(localStorage.getItem('persist')) || false
        setPersist(pers)
    }, [persist])

    if(isLoading) return <p>Loading</p>

    return (
        <div className='login'>
            <div></div>
            <div className='loginForm'>
                <h2>Employee Login</h2>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values }) => (
                        <Form>
                            <Field type="text" autoComplete="off" name="username" value={`${values.username}`} placeholder="Username" className="textField" />
                            <Field type="password" name="password" value={`${values.password}`} placeholder="Password" className="textField" />
                            <label style={{ display: 'block', marginBottom: '1rem', }}>
                                <Field type="checkbox" name="persist" id="persistToggle" />
                                <span style={{ marginLeft: '.5rem'}}>Save login info</span>
                            </label>
                            <button type="submit" className="btnSubmit" >Login</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginPage
