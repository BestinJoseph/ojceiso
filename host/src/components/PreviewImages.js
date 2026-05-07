import React, { useState } from 'react'

const PreviewImages = ({ file }) => {
    const [preview, setPreview] = useState(null)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        setPreview(reader.result)
    }

    return (
        <div>
            <img src={preview} width={`100`} height={`150`} />
        </div>
    )
}

export default PreviewImages