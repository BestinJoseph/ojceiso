import React from 'react'
import { useGetTrainingsQuery } from './trainingApiSlice'
import TrainingItem from './TrainingItem'

const TrainingLists = () => {
    let content
    const { data: trainings, isSuccess, isError, error } = useGetTrainingsQuery('traininglists', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    if(isError) content = <p>Error in the page.</p>

    if(isSuccess) {
        const { ids } = trainings
        // console.log(ids)
        const trainingContent = ids?.length ? ids.map( (trainingId, i) => <TrainingItem key={i} sn={i + 1} trainingId={trainingId} />) : null

        content = <div style={{ }}>
            <ul style={{ fontWeight: '700', color: 'white', display: 'grid', gridTemplateColumns: '.1fr 1fr .2fr .3fr .3fr .2fr .15fr', background: 'blueviolet', listStyle: 'none', marginBottom: '.2rem', }}>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>SN</li>
                <li style={{ padding: '0 0 0 .5rem', display: 'flex', alignItems: 'center', }}>Training Name</li>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Level</li>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Planned On</li>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Training Type</li>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Status</li>
                <li style={{ padding: '.5rem 0', display: 'flex', justifyContent: 'center', }}>Action</li>
            </ul>
            <div>{trainingContent}</div>
        </div>
    }

    // console.log(trainings?.ids)

    return content
}

export default TrainingLists


