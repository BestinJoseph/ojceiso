import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import DocDownloader from '../../utils/DocDownloader'

import './Styles/RequestStyles.scss'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { MdArrowForward } from 'react-icons/md'

const Request = () => {
    const initialValues = {department: ''}
    const departmentes = ['Purchase', 'Repair', 'updations', 'Service', 'Vacation']
    const departments = [
        { name: 'New', forms: ["Lab Equipments", "IT Products", "Standards", "Stationery", "Email Account", "LIMS Account", "OJCE User"]}, 
        { name: 'Repair', forms: ["Lab Equipments", "IT Products", "Stationery"]},
        { name: 'Updation', forms: ["Email Account", "LIMS User", "OJCE User Profile", "Standard Version", "Calibration Certificate"]},
        { name: 'Vacation', forms: ["Requistion", "Handing Over", "Assignment"]}
    ]
    const [downloader, setDownloader] = useState(false)
    const navigate = useNavigate()

    const MyDoc = () => (
        <Document>
            <Page>
                // My document data
            </Page>
        </Document>
    );

    const handleSubmit = (values, actions) => {
        console.log(initialValues)
        if(values.name !== "") {
            setDownloader(true)
        }
    }

    return (
        <div className='request'>
            <div className='requestContainer' >
                <div style={{ display: !downloader ? 'block' : 'none'}}>
                    <h3>Form Center</h3>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {({values})=>(
                            <Form>
                                <div className='requestForm'>
                                    <Field as="select" name={`department`} className="requestFormSelect">
                                        <option value="">Select your Requistition Type</option>
                                        {
                                            departments && departments.map((dep, i)=>(
                                                <option value={dep?.name.toLocaleLowerCase()} key={i}>{dep.name}</option>
                                            ))
                                        }
                                    </Field>
                                    {
                                        departments.map( (deps, i) => {
                                            if( values.department !== "" ) {
                                                if( values.department === deps.name.toLocaleLowerCase() ) {
                                                    return <div key={i} className='requestFormsDownloadContainer'>
                                                        {
                                                            deps.forms.map((formm, i) => (
                                                                <div key={i} className='requestDownloadItem'>
                                                                    <h4 className='requestFormName'>{ formm }</h4>
                                                                    <MdArrowForward className='reqFormBtn' onClick={() => navigate({ pathname: '/employee/requests/create', search: createSearchParams({ formd: formm, type: deps.name.toLocaleLowerCase() }).toString()})} />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                } else {
                                                    return null
                                                }
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </div>
                                {/* <div style={{ marginTop: '1rem'}}>
                                    <button type="submit" style={{ padding: '.5rem .5rem', fontSize: '1.15rem', cursor: 'pointer' }}>Download</button>
                                </div> */}
                            </Form>
                        )}
                    </Formik>
                </div>
                <div style={{ display: downloader ? 'block' : 'none' }}>
                    <PDFDownloadLink document={<DocDownloader name={"nice"} />} fileName="somename.pdf">
                        {({ blob, url, loading, error }) =>
                            loading ? console.log(error) : 'Download now!'
                        }
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    )
}

export default Request
