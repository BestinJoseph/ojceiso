import React, { useEffect, useRef, useState } from 'react'
import { Field, Form, Formik } from 'formik'

import { positions } from '../../../../config/positions'
import { useUpdateMyProfileMutation } from '../../profileApiSlice'
import { selectAllDepartments, useGetDepartmentsQuery } from '../../../department/departmentApiSlice'
import { useAppSelector } from '../../../../app/hooks'

const ProfileHeader = ({ profile }) => {
    const [edit, setEdit] = useState(false)
    const [initialValues, setInitialValues] = useState({ name: '', position: '', department: '' })
    const [dpImage, setDpImage] = useState(`/images/male.png`)
    const dpRef = useRef()
    const [updateMyProfile, { data, isLoading, isSuccess, isError, error }] = useUpdateMyProfileMutation()
    const departments = useAppSelector( state => selectAllDepartments(state))
    const [uploadedDp, setUploadedDp] = useState(null)

    // console.log( profile )

    useEffect(()=>{
        if(profile && profile.name) {
            setInitialValues( pre => {
                return { ...pre, name: profile.name, position: profile.position, department: profile.department?.name.toLocaleUpperCase() || '' }
            })
        } else {
            console.log("")
        }

        if(profile.image) {  
            setDpImage(profile.image)
        }

        return () => { setInitialValues({}) }
    },[profile])

    if(!profile) return <p>Loading...</p>

    const handleSubmit = async (values, actions) => {
        await updateMyProfile({ body: values, id: profile.id, target: 'profile'})
        setEdit(false)
    }

    const handleChangeDb = (e) => {
        e.preventDefault()
        setUploadedDp(dpRef.current.files[0])
        const cachedUrl = URL.createObjectURL(dpRef.current.files[0])
        setDpImage(cachedUrl)
    }

    const handleSubmitDp = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', uploadedDp)
        await updateMyProfile({body: formData, id: profile.id, target: 'dp'}).unwrap()
        if(isLoading) console.log('its loading.....')
            console.log('Loaded')
        if(isSuccess) setUploadedDp(null)
            console.log(isSuccess)
        if(isError) {
            // console.log('')
        }
    }

    // console.log(departments)

    return (
        <div className='profileHeaderContainer' >
            <div className='profileDP'>
                <img src={ dpImage } alt="Profile Image" className="profileImage" />
                <form encType='multipart/form-data'>
                    <div className='dpUploadContainer'>
                        { !uploadedDp && profile.position === 'MANAGER' ? <input type='file' name="profile" onChange={handleChangeDb} ref={dpRef} className='inputDPImage' /> : null }
                    </div>
                    { uploadedDp && profile.position === 'MANAGER' ? <div className='dpUploadContainerSave' onClick={handleSubmitDp}><button type='submit'>save</button></div> : null }
                </form>
            </div>
            <div className='personalInfoContainer'>
                <div className= 'detailContainer'>
                    <p>Your Name</p>
                    <h3>{ profile.name.toLocaleUpperCase() }</h3> 
                </div>
                <div className='detailContainer'>
                    <p>Branch</p>
                    <h3>{ profile.department?.regions[0] }</h3> 
                </div>
                <div className='detailContainer'>
                    <p>Department</p>
                    <h3>{ profile.department?.name.toLocaleUpperCase() }</h3> 
                </div>
                <div className='detailContainer'>
                    <p>Desigination</p>
                    <h3>{ profile.position }</h3>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
