import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectCertificateById } from './certificateApiSlice'
import { useNavigate } from 'react-router-dom'

import './Styles/CertificateStyles.scss'

const Certificate = ({ sn, id}) => {
    const certificate = useAppSelector( (state) => selectCertificateById(state, id))
    const navigate = useNavigate()

    // console.log(certificate)

    const handleClick = () => {
        navigate({ pathname: `/employee/certificates/${id}`})
    }

    return (
        <div className='certificateItem'>
            <div className='certificateItemContainer'>
                <p className='certificateItemText' >{ sn }</p>
                <p className='certificateItemTextNoFlex'>{ certificate.name }</p>
                <p className='certificateItemTextNoLeftBorder'>{ certificate.ref }</p>
                <p className='certificateItemTextNoLeftBorder'>{ certificate.activatedon }</p>
                <p className='certificateItemTextNoLeftBorder'>{ certificate.expirydate }</p>
                {/* <p className='certificateItemTextNoLeftBorder'>{ certificate.status }</p> */}
                <div className='certificateViewBtn' onClick={() => handleClick() }>view</div>
            </div>
        </div>
    )
}

export default Certificate
