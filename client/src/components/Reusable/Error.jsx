import React, { useContext } from 'react'
import { languageContext } from '../../App.js'
import { Alert } from 'react-bootstrap'
import { MdError } from 'react-icons/md'


function Error() {

    const { language } = useContext(languageContext);

    return (
        <Alert variant="danger" className='d-flex justify-content-center' >
            <Alert.Heading><MdError /> {language === 'am' ? 'oops! You got an error!' : 'Germany Alert Text'}</Alert.Heading>
        </Alert>
    )
}

export default Error