import React from 'react'
import { useGetCertificatesQuery } from './certificateApiSlice'
import Certificate from './Certificate'

const CertificateLists = () => {
    let content
    const { data: certificates, isSuccess, isError, error } = useGetCertificatesQuery('certificatesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    if(!certificates) content = <p>Loading...</p>

    if(isError) content = <p>Page has some issues.</p>

    if(isSuccess) {
        const { ids } = certificates

        const certiContent = ids.length ? ids.map( (id, i) => <Certificate id={id} sn={i + 1} key={i} />) : null

        content = <div>
            <ul style={{ fontWeight: '700', color: 'white', display: 'grid', gridTemplateColumns: '.1fr 1fr .3fr .3fr .3fr .15fr', background: 'blueviolet', listStyle: 'none', marginBottom: '.2rem', }}>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>SN</li>
                <li style={{ padding: '0 0 0 .5rem', display: 'flex', alignItems: 'center', }}>Certificate Name</li>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Ref. No.</li>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Active From</li>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Expires On</li>
                {/* <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Status</li> */}
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Action</li>
            </ul>
            { certiContent}
        </div>
    }

    return content
}

export default CertificateLists
