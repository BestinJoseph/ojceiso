import React from 'react'
import { Outlet } from 'react-router-dom'

import './FormLayoutStyles.scss'

const FormLayout = React.forwardRef(({ children, title="Employee Profile", sub="reference no.: EP-110" }, ref) => {
    // console.log(children)
    return (
        <div className='formLayout'>
            <div className='ncrOnePrintHeader'>
                <img src="/ojce.svg" width={`100`} height={`100`} />
                <div className='ncrOnePrintHeaderContent'>
                    <div style={{ textAlign: 'right'}}>
                        <h1 style={{ textTransform: 'uppercase'}}>{ title }</h1>
                        <h5 style={{ textTransform: 'capitalize'}}>{ sub }</h5>
                    </div>
                </div>
            </div>
            <div style={{ height: '1035px', marginTop: '1rem', }}>
                { children }
            </div>
            <div className='ncrOnePrintFooter'>
                <div className='footerForReference'>
                    <div className='formReferenceItem'>
                        <p>Form No.:</p>
                        <h5 style={{ fontSize: '.59rem'}}>OJCE-RYD-CL-QSP-007,008,009&022-QF-009</h5>
                    </div>
                    <div className='formReferenceItem'>
                        <p>Rev. No.:</p>
                        <h5>001</h5>
                    </div>
                    <div className='formReferenceItem'>
                        <p>Issued Date:</p>
                        <h5>May 1, 2023</h5>
                    </div>
                    <div className='formReferenceItem'>
                        <p>Approved By:</p>
                        <h5>Dr. Eng. Fua'ad Ahmed</h5>
                    </div>
                    <div className='formReferenceItem'>
                        <p>Page:</p>
                        <h5>1 of 1</h5>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default FormLayout
