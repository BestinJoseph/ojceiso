import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectUserById, useUpdateUserRoleMutation } from '../usersApiSlice'
import { Field, Form, Formik } from 'formik'
import { MdAdd, MdCancel, MdSave } from "react-icons/md"

import '../Styles/UserSelectedItemStyles.scss'
import UserPersonalSection from './UserPersonalSection'
import UserProfessionalData from './UserProfessionalData'
import UserExperienceSection from './UserExperienceSection'
import UserEducationalSection from './UserEducationalSection'
import UserCertificationSection from './UserCertificationSection'

const UserSelectedItem = ({ id, setSelectedUser }) => {
    const employee = useAppSelector((state) => selectUserById(state, id))
    const [mode, setMode] = useState({ type: "", active: false, data: {} })
    const [initialValues, setInitialValues] = useState({roles: ''})
    const [updateUserRole, { data, isSuccess, isError, isLoading, error }] = useUpdateUserRoleMutation()
    const [tab, setTab] = useState("personal")
    const tabs = [{ type: 'personal', description: 'Personal Info'}, { type: 'experience', description: 'Experiences'}, { type: 'qualification', description: 'Qualifications'}, { type: 'certification', description: 'Certifications'}, { type: 'training', description: 'Trainings'}, { type: 'responsibility', description: 'Responsibilities'}, ]

    useEffect(() => {
        if(employee) {
            setInitialValues({ roles: employee.roles })
            setTab("personal")
        }
    }, [employee])

    // console.log(employee)
    // console.log(id)

    if(!employee) return "No name"

    const handleTabNav = async (type) => {
        if(type !== mode.type) {
            setMode({ type: "", active: false, data: {} })
        }
        setTab(type)
    }

    // console.log(mode)
    // console.log(employee?.profile)

    return (
        <div className='user'>
            <div className='userContainer'>
                <h2>{employee?.profile.name}</h2><h4>{employee?.profile.position}</h4>
            </div>
            <div className='selectUserDetails'>
                <UserProfessionalData profile={employee} id={employee.id} setSelectedUser={setSelectedUser} />
                <div className='tabContainer'>
                    <div className='userDetailTabs'>
                        { tabs && tabs.map((ta, i) => (
                            <li className={`deTabsItem ${ tab === ta.type ? 'active' : null }`} key={i} onClick={() => handleTabNav(ta.type)}>{ta.description}</li>
                        ))}
                    </div>
                    <div className='createTab'>
                        <MdAdd className='createIcon' style={{ display: mode.active ? "none" : "inline-block" }} onClick={() => setMode({ ...mode, type: tab, active: true })} />
                        <MdCancel className='createIcon' style={{ display: mode.active ? "inline-block" : "none" }} onClick={() => setMode({ ...mode, type: "", active: false, data: {} })} />
                    </div>
                </div>
                <div className='detailsContentSection'>
                    {(() => {
                        switch (tab) {
                            case "personal":
                                return <div>
                                    <UserPersonalSection profile={employee?.profile} id={employee.id}/>
                                </div>
                            case "experience":
                                return <div>
                                    <UserExperienceSection employee={employee} mode={mode} setMode={setMode} />
                                </div>
                            case "qualification":
                                return <div>
                                    <UserEducationalSection data={employee} mode={mode} setMode={setMode} />
                                </div>
                            case "certification":
                                return <div>
                                    <UserCertificationSection data={employee} mode={mode} setMode={setMode} />
                                </div>
                            case "training":
                                return <div>
                                    <UserEducationalSection data={employee} mode={mode} setMode={setMode} />
                                </div>
                            case "responsibility":
                                return <div>
                                    <UserEducationalSection data={employee} mode={mode} setMode={setMode} />
                                </div>
                            default:
                                return <div>Welcome to jungle.</div>
                        }
                    })()}
                </div>
                {/* <div>
                    <pre>{JSON.stringify(employee, undefined, 3)}</pre>
                </div> */}
            </div>
        </div>
    )
}

export default UserSelectedItem
