import React from 'react'

const Authorized = ({ personal, show }) => {

    if(show !== 'authorized') return null

    if(!personal) return <p>Loading...</p>

    return (
        <div style={{ marginTop: '1rem', }}>
            <div>
                <h4>Authorized</h4>
            </div>
        </div>
    )
}

export default Authorized