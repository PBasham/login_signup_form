import React from 'react'

export const ButtonOne = (props) => {
    const { text, version, onClick, style } = props

    return <div
        className={`${style} btn btn-v-${version}`}
        onClick={onClick} >
        {text}
    </div>
}