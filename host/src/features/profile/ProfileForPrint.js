import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import FormLayout from '../../layouts/FormLayout'

import './Styles/ProfileForPrintStyles.scss'

const ProfileForPrint = ({ eleRef, isPrinting, setIsPrinting, profile }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const proRef = useRef(null)
    const { educations, personal } = profile
    // console.log(profile.educations)
    let educ = [...educations].sort( (a,b) => b.completed - a.completed )[0]

    return (
        <div ref={eleRef}>
            <FormLayout>
                <div className='profilePrint'>
                    <div className='profileTopContainer'>
                        <div className='profileEmployements'>
                            <h3 className='profileEmployementsHeader'>Employment History</h3>
                            {
                                profile.employements && profile.employements.map( (emp, i) => (
                                    <div key={i} className='profileEmployementsItem'>
                                        <p style={{ marginRight: '.35rem' }}>{ `${emp.company}` }</p>
                                        <p>{ `| ${emp.position}` }</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='profileImageContainer'>
                            <img src={ profile.image ? profile.image : 'https://ojcestorage.blob.core.windows.net/files/male.png'} width={`100%`} height={`auto`} />
                        </div>
                    </div>
                    <div className='educationAndAfflication'>
                        <div className='educationAndAfflicationItems'>
                            { educ && <div>
                                    <h3>Highest Educational Attainment</h3>
                                    <h4>{ educ.course }</h4>
                                    <p>{ educ.institute }</p>
                                    <p>{ educ.location }</p>
                                    <p>{ educ.completed }</p>
                                </div>
                            }
                            <div>
                                <h3>Membership / Afflication</h3>
                            </div>
                        </div>
                    </div>
                    <div className='seminarsAndTraining'>
                        <h3>Seminars / Training Attended (In-House)</h3>
                        <div className='seminarsAndTrainingItems'>
                            <div>
                                <p>ACI - Aggregate Testing Technician Level - 1</p>
                            </div>
                            <div>
                                <p>Membership / Afflication</p>
                            </div>
                        </div>
                    </div>
                    <div className='externalTraining'>
                        <h3>Seminars / Training Attended (External)</h3>
                        <div className='externalTrainingItems'>
                            <div>
                                <p>ACI - Aggregate Testing Technician Level - 1</p>
                            </div>
                            <div>
                                <p>Membership / Afflication</p>
                            </div>
                        </div>
                    </div>
                    <div className='personalInformations'>
                        <h3>Personal Information</h3>
                        <div className='personalInformationsItems'>
                            <div className='personalInfoItem'>
                                <p>Name: { profile.name }</p>
                                <p>Iqama No.: { personal.iqama }</p>
                                <p>Employee ID: { '105' }</p>
                                <p>Contact No.: { personal.mobile }</p>
                                <p>Email: { personal.email }</p>
                                <p>Passport: { personal.passport }</p>
                            </div>
                            <div className='personalInfoItem'>
                                <p>Brith Date: { personal.dob }</p>
                                <p>Place of Birth: { personal.placeofbirth }</p>
                                <p>Citizenship: { personal.country }</p>
                                <p>Marital Status: { personal.marital }</p>
                                <p>Language Known: {  }</p>
                            </div>
                        </div>
                    </div>
                    <div className='profileDeclaration'>
                        <p>All inforamtion stated above are correct to the best of my knowledge.</p>
                        <div className='signatureAndUpdates'>
                            <div>
                                <p>Employee Name: { profile.name }</p>
                                <p style={{ marginTop: '2.5rem'}}>Signature</p>
                            </div>
                            <div>
                                <p>Updated date: </p>
                                <p style={{ marginTop: '2.5rem'}}>Updated by: </p>
                            </div>
                        </div>
                    </div>
                </div>
            </FormLayout>
        </div>
    )
}

export default ProfileForPrint