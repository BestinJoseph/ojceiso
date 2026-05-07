import React, { useEffect, useState } from 'react'

const TrainingSeminars = ({ trainings, show }) => {
    const [trainingTypes, setTrainingTypes] = useState({})
    useEffect(()=>{
        if(trainings && trainings.length > 0) {
            let arr = trainings.map( tra => tra.training )
            const aa = arr.reduce((acc, obj) => {
                acc[obj.trainingtype] = acc[obj.trainingtype] || []
                acc[obj.trainingtype][obj.section] = acc[obj.trainingtype][obj.section] || []
                acc[obj.trainingtype][obj.section].push(obj)
                return acc
            }, {})
            setTrainingTypes(aa)
        }
        // ['level']: obj.training.level, ['tests']: (acc[obj.training.section.toLowerCase()] || []).concat(obj)
        return () => { setTrainingTypes({}) }
    },[])

    if(show !== 'trainings') return null

    if(!trainings) return <p>Loading...</p>

    // console.log(trainingTypes)

    return (
        <div style={{ marginTop: '1rem', }}>
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem', marginBottom: '1rem' }}>
                    {
                        Object.entries(trainingTypes).map( ([keys, val]) => {
                            return <div key={keys} >
                                <h2 style={{ marginBottom: '1rem', }}>{keys} Training</h2>
                                {
                                    Object.entries(val).map( ([ke, va]) => {
                                        return <div key={ke} style={{ marginBottom: '1rem'}}>
                                            <h3>{ke} Testing</h3>
                                            <div>
                                                {
                                                    va.map((train, i) => (
                                                        <div key={i}>
                                                            <p>{train.name} - {`Level - ${train.level}`}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                {/* <div  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem', marginBottom: '1rem', }}>
                    <div>
                        <h4>Soil Testing - Level 1</h4>
                        <p>C136/C136M-14, D75/D75M-14, C702/C702M-22, C117-13, C127-15, C128-15, c566-13</p>
                    </div>
                    <div>
                        <h4>Measurement of uncertainty Training</h4>
                        <h4>Standard Test Method for Soundness of Aggregate by use of Sodium Sulfate (ASTM C88/C88M-18)</h4>
                    </div>
                </div> */}
            </div>
            {/* <div style={{ marginTop: '1rem', }}>
                <h2 style={{ marginBottom: '1rem', }}>External Traning</h2>
                <div  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem', marginBottom: '1rem', }}>
                    <div>
                        <h4>Duration 2 days</h4>
                        <h4>Awareness Training - ISO 17025:2005</h4>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default TrainingSeminars
