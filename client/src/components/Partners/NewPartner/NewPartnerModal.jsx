import { useState, useEffect, useContext } from 'react'
import { getPartnerContext } from '../Partners.jsx';
import { languageContext } from '../../../App.js';
import { Modal, Button, Form } from 'react-bootstrap';
import { handleFormCloseLanguage, handleFormConfirmLanguage } from '../../projects/content.js';
import { handlePartnerTitle } from '../content.js';
import SmallLoader from '../../Reusable/SmallLoader.js';
import Error from '../../Reusable/Error.jsx';

function NewPartnerModal(props) {

    const getPartners = useContext(getPartnerContext);
    const { language } = useContext(languageContext);
    const editPartner = props.partner;
    const method = editPartner ? 'PUT' : 'POST';
    const endpoint = editPartner ? `${process.env.REACT_APP_SERVER}/partners/${editPartner._id}` : `${process.env.REACT_APP_SERVER}/partners`;

    const initialState = {
        name_am: editPartner ? editPartner.name_am : '',
        name_de: editPartner ? editPartner.name_de : '',
        name_en: editPartner ? editPartner.name_en : '',
        avatar: editPartner ? editPartner.avatar : {},
    }

    const [partner, setPartner] = useState(initialState);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const validPartnerNameAm = partner.name_am.length > 0;
    const validPartnerNameDe = partner.name_de.length > 0;
    const validPartnerNameEn = partner.name_en.length > 0;
    const validAvatar = image;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const partnerApi = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(partner)
            })
            if (partnerApi.ok && image !== null) {
                const data = await partnerApi.json()
                const formData = new FormData()
                formData.append('avatar', image)
                partner.avatar.url && await fetch(`${process.env.REACT_APP_SERVER}/partners/${data._id}/delete-avatar`, { method: 'POST' })
                const AddCloudinary = await fetch(`${process.env.REACT_APP_SERVER}/partners/${data._id}/avatar`, { body: formData, method: 'POST' })
                if (AddCloudinary.ok) {
                    props.onHide()
                    setLoading(false)
                    !editPartner && setPartner(initialState)
                    getPartners()
                } else {
                    setLoading(false)
                    setError(true)
                    console.log(error);
                }
            } else if (partnerApi.ok && image === null) {
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
        <Modal {...props} size="md" centered >
            <Modal.Header closeButton>
                <Modal.Title> {handlePartnerTitle(language)} </Modal.Title>
            </Modal.Header>
            {error && <Error />}
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            isValid={validPartnerNameAm}
                            isInvalid={!validPartnerNameAm}
                            type="text"
                            placeholder="Գործընկերոջ անվանումը"
                            value={partner.name_am}
                            onChange={(e) => setPartner({ ...partner, name_am: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            isValid={validPartnerNameDe}
                            isInvalid={!validPartnerNameDe}
                            type="text"
                            placeholder="Name des Partners"
                            value={partner.name_de}
                            onChange={(e) => setPartner({ ...partner, name_de: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            isValid={validPartnerNameEn}
                            isInvalid={!validPartnerNameEn}
                            type="text"
                            placeholder="Partners Name"
                            value={partner.name_en}
                            onChange={(e) => setPartner({ ...partner, name_en: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Control
                            isValid={editPartner ? '' : validAvatar}
                            isInvalid={editPartner ? '' : !validAvatar}
                            type="file"
                            size="sm"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>{handleFormCloseLanguage(language)}</Button>
                {
                    loading ?
                        <SmallLoader color='white' /> :
                        <Button
                            type="submit"
                            disabled={!validPartnerNameAm || !validPartnerNameDe || (!editPartner ? !validAvatar : null)}
                            onClick={handleSubmit}>{handleFormConfirmLanguage(language)}
                        </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default NewPartnerModal