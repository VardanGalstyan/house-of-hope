import React from 'react'
import { Container } from 'react-bootstrap'
import { Watch } from 'react-loader-spinner'
import './style.css'

function Loader() {
    return (
        <Container className='loader'>
            <Watch
                height="30"
                width="30"
                color='grey'
                ariaLabel='loading'
            />
        </Container>
    )
}

export default Loader