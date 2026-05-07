import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectCertificateById } from './certificateApiSlice'

import './Styles/CertificateOneStyles.scss'
import CertificateUpdateModal from './components/CertificateUpdateModal'

const CertificateOne = () => {
    const { id } = useParams()
    const certificate = useAppSelector((state) => selectCertificateById(state, id))
    const [update, setUpdate] = useState(false)

    if(!certificate) return <p>No Certificate Found.</p>

    return (
        <div className='certificateOne'>
            <div className='certificateOneContainer'>
                <div><button onClick={() => setUpdate(true)}>Update</button></div>
                <ul className='certificateItemsList'>
                    <li className='certificateItem'>Name: 
                        <div className='certificateItemValue'>
                            <h4>{certificate?.name}</h4>
                        </div>
                    </li>
                    <li className='certificateItem'>Refernce No.: 
                        <div className='certificateItemValue'>
                            <h4>{certificate?.ref}</h4>
                        </div>
                    </li>
                    <li className='certificateItem'>Valid From: 
                        <div className='certificateItemValue'>
                            <h4>{certificate?.activatedon}</h4>
                        </div>
                    </li>
                    <li className='certificateItem'>Expires On:
                        <div className='certificateItemValue'>
                            <h4>{certificate?.expirydate}</h4>
                        </div>
                    </li>
                    <li className='certificateItem'>Version: 
                        <div className='certificateItemValue'>
                            <h4>{ certificate?.expired.length + 1}</h4>
                        </div>
                    </li>
                </ul>
                <div className='certificateDocument'>
                    <h4 style={{ marginBottom: '1rem', }}>Current Certificate</h4>
                    <div className='certificateDocContainer'>
                        { certificate.doc?.pathname && <img src={`http://localhost:8000/images/evidences/${certificate?.doc.pathname}`} alt={certificate.name} width={`100%`} height={`auto`} />}
                    </div>
                </div>
                <div className='certificateExpiredDocument'>
                    <h4 style={{ marginBottom: '1rem', }}>Current Certificate</h4>
                    <div className='expiredDocSection'>
                    {
                        certificate?.expired.map((docc, i) => (
                            <div className='certificateExpiredDocContainer' key={i}>
                                <img src={`http://localhost:8000/images/evidences/${docc.pathname}`} alt={certificate.name} width={`100%`} height={`auto`} />
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            <CertificateUpdateModal certificateData={certificate} setUpdate={setUpdate} update={update}/>
        </div>
    )
}

export default CertificateOne
