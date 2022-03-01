import React, { useState, useEffect, useContext } from 'react'
import { getPartnerContext } from '../Partners.jsx';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import SmallLoader from '../../Reusable/SmallLoader.js';

function NewPartnerModal(props) {

    const getPartners = useContext(getPartnerContext);
    const editPartner = props.partner;
    const method = editPartner ? 'PUT' : 'POST';
    const endpoint = editPartner ? `https://house-of-hope.herokuapp.com/partners/${editPartner._id}` : 'https://house-of-hope.herokuapp.com/partners';

    const initialState = {
        name_am: editPartner ? editPartner.name_am : '',
        name_de: editPartner ? editPartner.name_de : '',
        logo: editPartner ? editPartner.logo : '',
    }

    const [partner, setPartner] = useState(initialState);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const validPartnerNameAm = partner.name_am.length > 0;
    const validPartnerNameDe = partner.name_de.length > 0;
    const validLogo = image;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(partner)
            })
            if (res.ok && image !== null) {
                const data = await res.json()
                const formData = new FormData()
                formData.append('avatar', image)
                const response = await fetch(`https://house-of-hope.herokuapp.com/partners/${data._id}/avatar`, {
                    body: formData,
                    method: 'POST',
                })
                if (response.ok) {
                    props.onHide()
                    setLoading(false)
                    !editPartner && setPartner(initialState)
                    getPartners()
                } else {
                    setLoading(false)
                    setError(true)
                    console.log(error);
                }

            } else if (res.ok && image === null) {
                props.onHide()
                setLoading(false)
                !editPartner && setPartner(initialState)
                getPartners()
            }
            else {
                setLoading(false)
                setError(true)
                console.log(error);
            }
        } catch (error) {
            setError(true)
            console.log(error);
        }
    }

    const handleClose = () => {
        setPartner(initialState);
        setLoading(false);
        setError(false);
        setImage(null);
        props.onHide();
    }

    useEffect(() => {
        setPartner(initialState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editPartner])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add a Partner
                </Modal.Title>
            </Modal.Header>
            {
                error &&
                <Alert variant="danger" className='d-flex justify-content-center' >
                    <Alert.Heading>oops! You got an error!</Alert.Heading>
                </Alert>
            }
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            isValid={validPartnerNameAm}
                            isInvalid={!validPartnerNameAm}
                            type="text"
                            placeholder="Partners Name"
                            value={partner.name_am}
                            onChange={(e) => setPartner({ ...partner, name_am: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            isValid={validPartnerNameDe}
                            isInvalid={!validPartnerNameDe}
                            type="text"
                            placeholder="Partners Name"
                            value={partner.name_de}
                            onChange={(e) => setPartner({ ...partner, name_de: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Control
                            isValid={editPartner ? '' : validLogo}
                            isInvalid={editPartner ? '' : !validLogo}
                            type="file"
                            size="sm"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
                {
                    loading ?
                        <SmallLoader color='white' /> :
                        <Button
                            type="submit"
                            disabled={!validPartnerNameAm || !validPartnerNameDe || (!editPartner ? !validLogo : null)}
                            onClick={handleSubmit}>Submit
                        </Button>

                }
            </Modal.Footer>
        </Modal>
    )
}

export default NewPartnerModal