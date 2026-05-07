import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const UserOne = () => {
    let content
    const [params, setParams] = useSearchParams()
    const { id } = useParams()

    return (
        <div>UserOne</div>
    )
}

export default UserOne
