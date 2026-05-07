import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectNcrById } from './ncrsApiSlice'
import { useReactToPrint } from 'react-to-print';
// import PDFViewer from 'pdf-viewer-reactjs'
import ReactPDF, { PDFViewer } from '@react-pdf/renderer'

import './Styles/NcrOneStyles.scss'
import { createSearchParams, useNavigate } from 'react-router-dom';
import NcrOnePrint from './NcrOnePrint';

const NcrOne = ({ params, setSearchParams }) => {
    const ncr = useAppSelector( state => selectNcrById(state, params))
    const navigate = useNavigate()
    const [action, setAction] = useState('immediate action')
    const [print, setPrint] = useState(false)
    const eleRef = useRef(null)
    const [isPrinting, setIsPrinting] = useState(false)
    const promiseResolveRef = useRef(null)

    useEffect(()=>{
        let isSubscribed = true

        if(ncr && isSubscribed) {
            if(ncr.immediateAction === null ) {
                setAction('immediateAction')
            } else if (ncr.correctiveAction === null) {
                setAction('correctiveAction')
            } else if ( ncr.verification === null ) {
                setAction('verification')
            } else {
                setAction('closed')
            }
        }

        if(isPrinting && promiseResolveRef.current) {
            promiseResolveRef.current()
        }

        return () => isSubscribed = false
    },[ncr, isPrinting])

    if(!ncr) return <p>Loading....</p>

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

    const handleActionBtn = () => {
        setPrint(true)
        navigate({ pathname: '/employee/ncrs', search: createSearchParams({ type: 'update', ncr: ncr.id, action }).toString() })
    }

    return (
        <div className='ncrOne'>
            <div style={{ display: 'none' }} >
                <NcrOnePrint params={params} eleRef={eleRef} />
            </div>
            
            <div className='PrintandUpdateSection'>
                <div className='printAndUpdateContainer'>
                    <div className='targetDateConatiner'>
                        <p>Target Date</p>
                        <h2>{ ncr.raisedOn }</h2>
                    </div>
                    <div className='printAndActionBtns'>
                        <button className='printBtn'
                            disabled={ action === 'closed' }
                            onClick={ () => handleActionBtn() }
                        >
                            { action }
                        </button>
                        <button className='printBtn' onClick={ () => handlePrint() }>Print it</button>
                    </div>
                </div>
            </div>
        </div>
    )
    return <p>nice.</p>
}

export default NcrOne
