import React from 'react'

import '../../Styles/UserEducationalSectionStyles.scss'
import AddUserEducation from './AddUserEducation'

const UserEducationalSection = ({ data: { profile: { id, educations } }, mode, setMode }) => {

    // console.log(data, mode)
    console.log(educations)

    return (
        <div className='qualification'>
            { mode?.active ? null : <div className='qualification__lists'>
                    {
                        educations && educations.map((edu, i) => (
                            <div className='qualification__lists--item' key={i}>
                                <div className='qual__item--header'>
                                    <h4>{edu.course}</h4>
                                </div>
                                <div className='qual__item--content'>
                                    <p>{`${edu.start} - ${edu.completed}`}</p>
                                    <h5>{edu.discipline}</h5>
                                    <p>{`${edu.institute}, ${edu.location}`}</p>
                                    <p>{edu.mark}(%) Percentage</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            <AddUserEducation mode={mode} setMode={setMode} id={id} />
        </div>
    )
}

export default UserEducationalSection
