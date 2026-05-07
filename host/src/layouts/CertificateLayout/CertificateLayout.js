import React, { useEffect, useState } from 'react'
import { createSearchParams, Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import './CertificateLayoutStyles.scss'
import CertificateLists from '../../features/certificate/CertificateLists'
import CertificateOne from '../../features/certificate/CertificateOne'
import CreateCertificate from '../../features/certificate/CreateCertificate'

const CertificateLayout = () => {
    const certificateMenu = ['new certificate', 'all certificate', 'scheduled certificate', 'completed certificate', 'incompleted certificate', 'deleted certificate' ]
    const navigate = useNavigate()
    const [select, setSelect] = useState('all')
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    // console.log(type)

    useEffect(()=>{
        if(searchParams.get('type')) {
            setSelect(searchParams.get('type'))
        }

        return () => setSelect('all')
    },[searchParams])

    const handleMenu = (item) => {
        setSelect(item.split(' ')[0])
        navigate({ pathname: '/employee/certificates', search: createSearchParams({ type: item.split(' ')[0]}).toString()})
    }

    return (
        <div className='certificateLayout'>
            <div className='certificateContainers'>
                <div className='certificateMenu'>
                    <h4>Certificate</h4>
                    <div className='certificateMenuItems'>
                        {
                            certificateMenu.map((menu, i) => (
                                <li style={{ background: select === menu.split(' ')[0] ? '#fffafa' : 'none'}} key={i} className='menuItem' onClick={() => handleMenu(menu) }>{menu}</li>
                            ))
                        }
                    </div>
                </div>
                <div className='certificateContentContainer'>
                    {
                        id ? <CertificateOne /> :
                            (()=>{
                                switch (select) {
                                    case 'all':
                                        return <CertificateLists />
                                    case 'new':
                                        return <CreateCertificate />
                                    default:
                                        return <CertificateLists />
                                }
                            })()
                    }
                </div>
            </div>
        </div>
    )
}

export default CertificateLayout
