import React from 'react'
import { Watch } from 'react-loader-spinner'

function SmallLoader({ color }) {
    return (
        <>
            <Watch
                height="30"
                width="30"
                color={color}
                ariaLabel='loading'
            />
        </>
    )
}

export default SmallLoader