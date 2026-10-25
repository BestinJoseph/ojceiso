import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetRequestQuery } from './requestApiSlice'

const Requestfile = () => {
    let content
    const { id } = useParams()
    const { data, isError, } = useGetRequestQuery(id)
    const navigate = useNavigate()

    console.log(data)
    console.log(isError)

    if(_.isUndefined(data)) console.log('nice......')

    if(isError) (<p>Get an error.</p>)

    return content
}

export default Requestfile
