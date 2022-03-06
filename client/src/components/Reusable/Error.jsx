import { Alert } from 'react-bootstrap'
import { MdError } from 'react-icons/md'


function Error() {


    return (
        <Alert variant="danger" className='d-flex justify-content-center' >
            <Alert.Heading><MdError /> {'Oops, Sorry! You got an Error!'}</Alert.Heading>
        </Alert>
    )
}

export default Error