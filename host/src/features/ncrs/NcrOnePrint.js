import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectNcrById } from './ncrsApiSlice'
import FormLayout from '../../layouts/FormLayout';

import './Styles/NcrOneStyles.scss'
import { useReactToPrint } from 'react-to-print'

const NcrOnePrint = ({params, eleRef}) => { //React.forwardRef((props, printNcrRef)
    const ncr = useAppSelector( state => selectNcrById(state, params))
    const ncrRef = useRef(null)

    useEffect(()=>{

        return () => console.log('ref changed.')
    },[ncrRef])

    if(!ncr) return <p>Loading....</p>

    if(!ncr) return <p>Loading....</p>
    // className='ncrOne'
    return (
            <div style={{ paddingTop: '1rem' }} ref={eleRef}>
                <FormLayout title="Non-Conformity Report" sub="Customer Complaints / External & Internal Audit / Day to Day Work Monitoring">
                    <div className='ncrOne'>
                        <div className='ncrConatiner'>
                            <div className='ncrRefandDateSection'>
                                <div className='ncrRefSection'>
                                    <p>NCR Ref.:</p>
                                    <h4>{ ncr.ncr_ref }</h4>
                                </div>
                                <div className='ncrDateSection'>
                                    <p>Date:</p>
                                    <h4>{ ncr.foundOn }</h4>
                                </div>
                            </div>
                            <div className='ncrRefandDateSection'>
                                <div className='ncrTypeSection'>
                                    <p>NCR Type:</p>
                                    <h4>{ ncr.ncr_type }</h4>
                                </div>
                                <div className='ncrReqRefSection'>
                                    <p>Req. Ref.:</p>
                                    <h4>{ ncr.req_ref }</h4>
                                </div>
                            </div>
                            <div className='ncrDetailsContainer'>
                                <div className='ncrDetailsContentSection'>
                                    <p>Details of Non-conformity & Observation:</p>
                                    <h4>{ncr.details}</h4>
                                </div>
                            </div>
                            <div className='ncrRefandDateSection'>
                                <div className='ncrSignificanceSection'>
                                    <p>Significance of Non-Conformance</p>
                                </div>
                                <div className='ncrDateSection'>
                                    <div>
                                        <input type='checkbox' defaultChecked={ ncr.significance === 'major' } id="major" name="major" style={{ marginRight: '.5rem'}} />
                                        <label htmlFor='major'>Major</label>
                                    </div>
                                    <div>
                                        <input type='checkbox' defaultChecked={ ncr.significance === 'minor' } id="minor" name="minor" width={`3px`} style={{ marginRight: '.5rem'}} />
                                        <label htmlFor='minor'>Minor</label>
                                    </div>
                                </div>
                            </div>
                            <div className='ncrRefandDateSection'>
                                <div className='ncrTypeSection'>
                                    <p>Raised By:</p>
                                    <h4>{ ncr.raisedBy }</h4>
                                </div>
                                <div className='ncrSignatureandRaisedAtSection'>
                                    <div className='ncrSignRaised'>
                                        <p>Signature:</p>
                                        <h4></h4>
                                    </div>
                                    <div className='ncrSignRaised'>
                                        <p>Date:</p>
                                        <h4>{ (ncr.raisedOn)?.substring(0, 15) }</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='ncrDetailsContainer'>
                                <div className='ncrDetailsContentSection'>
                                    <p>Details of Immediate Correction done:</p>
                                    <h4>{ ncr.immediateAction?.iaction }</h4>
                                </div>
                            </div>
                            <div className='ncrRefandDateSection'>
                                <div className='ncrSignCorrection'>
                                    <p>Correction by:</p>
                                    <h4>{ ncr.immediateAction?.correctedBy }</h4>
                                </div>
                                <div className='ncrSignatureandRaisedAtSection'>
                                    <div className='ncrSignRaised'>
                                        <p>Signature:</p>
                                        <h4></h4>
                                    </div>
                                    <div className='ncrSignRaised'>
                                        <p>Date:</p>
                                        <h4>{ ncr.immediateAction?.correctedOn }</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='ncrDetailsContainer'>
                                <div className='ncrDetailsContentSection'>
                                    <p>Root Cause:</p>
                                    <h4>{ ncr.correctiveAction?.routecause }</h4>
                                </div>
                            </div>
                            <div className='ncrDetailsContainer'>
                                <div className='ncrDetailsContentSection'>
                                    <p>Corrective Action / Preventive Action / Recommendations:</p>
                                    <h4>{ ncr.correctiveAction?.caction }</h4>
                                </div>
                            </div>
                            <div className='ncrRefandDateSection'>
                                <div className='ncrSignCorrection'>
                                    <p>Approved by:</p>
                                    <h4>{ ncr.correctiveAction?.approvedBy }</h4>
                                </div>
                                <div className='ncrSignatureandRaisedAtSection'>
                                    <div className='ncrSignRaised'>
                                        <p>Signature:</p>
                                        <h4></h4>
                                    </div>
                                    <div className='ncrTargetDate'>
                                        <p>Target Date:</p>
                                        <h4>{ (ncr.raisedOn)?.substring(0, 10) }</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='ncrRefandDateSection'>
                                <div className='ncrSignImplemented'>
                                    <p>Immplemented by:</p>
                                    <h4>{ ncr.correctiveAction?.implementedBy }</h4>
                                </div>
                                <div className='ncrSignatureandRaisedAtSection'>
                                    <div className='ncrSignRaised'>
                                        <p>Signature:</p>
                                        <h4></h4>
                                    </div>
                                    <div className='ncrSignRaised'>
                                        <p>Date:</p>
                                        <h4>{ ncr.correctiveAction?.implementedOn }</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='ncrDetailsContainer'>
                                <div className='ncrDetailsContentSection'>
                                    <p>Details of verification of effectiveness of corrective / Preventive Action:</p>
                                    <h4>{ ncr.verification?.effectiveness }</h4>
                                </div>
                            </div>
                            <div className='ncrCorrectionVerficationSection'>
                                <div className='ncrVerifiedBy'>
                                    <p>*Corrective actions verified by:</p>
                                    <h4>{ ncr.verification?.verifiedBy }</h4>
                                </div>
                                <div className='ncrVerifiedDate'>
                                    <p>Date:</p>
                                    <h4>{ ncr.verification?.verifiedOn }</h4>
                                </div>
                            </div>
                            <div className='ncrSupportAndCloseOutSection'>
                                <div className='ncrVerifiedBy'>
                                    <p>Supporting Document (if applicable):</p>
                                    <h4></h4>
                                </div>
                                <div className='ncrVerifiedDate'>
                                    <p>Close-Out Accepted:</p>
                                    <h4>{ ncr.verification === null ? "" : ncr.verification?.acceptence ? 'Yes' : 'No'}</h4>
                                </div>
                            </div>
                            <div className='ncrDetailsContainer'>
                                <div className='ncrDetailsContentSection'>
                                    <p>Requirement of communication of information to customer: Yes / No</p>
                                    <p>If "Yes": (Detail of Communication)</p>
                                </div>
                            </div>
                            <div className='ncrCorrectionVerficationSection'>
                                <div className='ncrVerifiedBy'>
                                    <p>*Informed by:</p>
                                    <h4></h4>
                                </div>
                                <div className='ncrVerifiedDate'>
                                    <p>Date:</p>
                                    <h4></h4>
                                </div>
                            </div>
                        </div>
                        <p className='noteText'>Note: (*) External Personnel not involved in the original laboratory activities in question shall review, approve and shall commnicate the outcome of the complaint to the customer</p>
                    </div>
                </FormLayout>
                {
                    ncr.evidence?.length && <>
                        <div className='page-break' />
                        <div>
                            <h2>Evidence of NCR</h2>
                        </div>
                        {
                            ncr.evidence.map((file, i) => {
                                
                                return (
                                    <div key={i}>
                                        <div className='page-break' />
                                        <img src={`http://localhost:8000/images/evidences/${file.pathname}`} alt={ file.pathname} width={`100%`} height={`100%`} style={{ border: '1px solid red'}} />
                                    </div>
                                )
                            })
                        }
                    </>
                }
            </div>
    )
}

export default NcrOnePrint
