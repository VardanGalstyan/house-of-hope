import React, { useState, useContext } from 'react'
import { getPartnerContext } from '../Partners';
import { Modal, Button } from 'react-bootstrap';
import Error from '../../Reusable/Error';
import SmallLoader from '../../Reusable/SmallLoader';

function DeletePartnerModal(props) {

    const getPartners = useContext(getPartnerContext);
    const { partner } = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://house-of-hope.herokuapp.com/partners/${partner._id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                props.onHide()
                setLoading(false);
                getPartners()
            } else {
                console.log('error in delete partner')
                setLoading(false);
                setError(true);
            }
        } catch (error) {
            console.log(error)
            setError(true);
            setLoading(false);
        }
    }

    const handleClose = () => {
        setError(false);
        setLoading(false);
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {
                error && <Error />
            }
            <Modal.Body className='d-flex justify-content-center'>
                {
                    loading ? <SmallLoader color='white' /> :
                        <h4 className='text-center'>Are you sure you want to remove {partner.name_de}?</h4>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleDelete}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletePartnerModal