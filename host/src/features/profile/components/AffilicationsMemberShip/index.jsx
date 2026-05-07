import React from 'react'

const AffilicationsMemberShip = ({ personal, show }) => {

    if(show !== 'affliations' ) return null

    if(!personal)  return <p>Loading...</p>

    return (
        <div style={{ marginTop: '1rem', }}>
            <div>
                <div>
                    <h2>American Concrete Institute</h2>
                </div>
                <div>
                    <h4>Senior Lab, Technician</h4>
                    <p>March, 2008</p>
                </div>
            </div>
        </div>
    )
}

export default AffilicationsMemberShip
