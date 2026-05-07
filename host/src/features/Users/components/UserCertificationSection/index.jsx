import React from 'react'

import '../../Styles/UserCertificationSectionStyles.scss'
import AddUserCertification from './AddUserCertification'

const UserCertificationSection = ({ data: { profile: { id, certificates } }, mode, setMode }) => {

    console.log(certificates, mode)

    if( !mode.active ) {
        if(certificates?.length < 0 || certificates === null ) {
            return <div className='certificates'>
                <div className='certificate__lists'>
                    <div className='certificate__lists-item'>
                        <div className='certificate__item--header'>
                            <h4>ACI Training</h4>
                        </div>
                        <div className='certificate__item--content'>
                            <p>Name of the certification </p>
                            <h5>Department</h5>
                            <p>Training provider</p>
                            <p>Certification Date</p>
                            <p>Expires on.</p>
                        </div>
                    </div>
                    <div className='certificate__lists-item'>
                        <div className='certificate__item--header'>
                            <h4>Internal Training</h4>
                        </div>
                        <div className='certificate__item--content'>
                            <p>Name of the certification </p>
                            <h5>Department</h5>
                            <p>Training provider</p>
                            <p>Certification Date</p>
                            <p>Expires on.</p>
                        </div>
                    </div>
                </div>
            </div>
        } else {
            return <div className='certificates'>
                <div className='certificate__lists'>
                    {
                        certificates && certificates.map((cert, i) => (
                            <div className='certificate__lists-item' key={i}>
                                <div className='certificate__item--header'>
                                    <h4>Course Name</h4>
                                </div>
                                <div className='certificate__item--content'>
                                    <p>Name of the certification </p>
                                    <h5>Department</h5>
                                    <p>Training provider</p>
                                    <p>Certification Date</p>
                                    <p>Expires on.</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        }
    }

    return <AddUserCertification setMode={setMode} id={id} />
}

export default UserCertificationSection
