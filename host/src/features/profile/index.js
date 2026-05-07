import React, { useEffect, useRef, useState } from 'react'
import { useGetMyProfileQuery } from './profileApiSlice'

import './Styles/ProfileStyles.scss'
import ProfileHeader from './components/ProfileHeader'
import PersonalInformation from './components/PersonalInformation'
import Educations from './components/Educations'
import Employements from './components/Employments'
import TrainingSeminars from './components/TrainingSeminars'
import AffilicationsMemberShip from './components/AffilicationsMemberShip'
import Authorized from './components/Authorized'
import { useReactToPrint } from 'react-to-print'
import ProfileForPrint from './ProfileForPrint'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

const Profile = () => {
    let content
    const { data: profile, isSuccess, isError, error, isLoading } = useGetMyProfileQuery('profile', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const tabs = ['personal', 'employments', 'educations', 'affliations', 'trainings', 'authorized']
    const [subTab, setSubTab] = useState('personal')
    const eleRef = useRef(null)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [isPrinting, setIsPrinting] = useState(false)
    const promiseResolveRef = useRef(null)

    

    useEffect(() => {
        if(isPrinting && promiseResolveRef.current ) {
            promiseResolveRef.current()
        }

        return () => {}
    },[isPrinting])

    const handlePrint = useReactToPrint({
        content: () => eleRef.current,
        pageStyle: `@media print {
            @page {
                size: 750px 1105px;
                margin: 10px 0 0 15px;
            }
        }`,
        onBeforePrint: () => {
            return new Promise((resolve) => {
                promiseResolveRef.current = resolve;
                setIsPrinting(true);
            });
        },
        onAfterPrint: () => {
            // Reset the Promise resolve so we can print again
            promiseResolveRef.current = null;
            setIsPrinting(false);
        }
    })

    if(isError) return content = <div><p>{ error?.data.message }</p></div>
    
    if(!isSuccess) return content = <p className='profile'>Loading...</p>

    if(isLoading) return content = <p className='profile'>Loading...</p>

    // console.log(profile)

    content = <div className='profile'>
        <div className='profileNameSection'>
            <h2>Welcome, {profile.name}</h2>
            <div>
                <button className='profilePrintBtn' onClick={() => handlePrint() }>Print</button>
                <div style={{ display: 'none', }}>
                    <ProfileForPrint eleRef={eleRef} isPrinting={isPrinting} setIsPrinting={setIsPrinting} profile={profile} />
                </div>
            </div>
        </div>
        <ProfileHeader profile={profile} />
        <div className='profileContentConatiner'>
            <ul className='profileLinks'>
                {
                    tabs && tabs.map( (tab, i) => (
                        <li key={i} className={`profileLinksItem ${ tab === subTab ? 'active' : null }`} onClick={() => setSubTab(tab)}>
                            <h4 style={{ textTransform: 'capitalize' }}>{tab}</h4>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div>
            <PersonalInformation id={profile.id} personal={profile.personal} show={subTab} />
            <Educations id={profile.id} educations={profile.educations} show={subTab} />
            <Employements id={profile.id} employements={profile.positions} show={subTab} />
            <TrainingSeminars id={profile.id} trainings={profile.attendee} show={subTab} />
            <AffilicationsMemberShip personal={profile} show={subTab} />
            <Authorized personal={profile} show={subTab} />
        </div>
    </div>

    return content
}

export default Profile
