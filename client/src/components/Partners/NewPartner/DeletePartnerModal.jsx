import { useState, useContext, useCallback } from 'react'
import { getPartnerContext } from '../Partners';
import { Modal, Button } from 'react-bootstrap';
import { handleModalDeleteLanguage, handleModalDeleteNoLanguage, handleModalDeleteYesLanguage } from '../../News/content';
import Error from '../../Reusable/Error';
import SmallLoader from '../../Reusable/SmallLoader';

function DeletePartnerModal({ partner, language, ...props }) {

    const getPartners = useContext(getPartnerContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleDelete = useCallback(async () => {
        try {
            setLoading(true);
            partner.avatar && await fetch(`${process.env.REACT_APP_SERVER}/partners/${partner._id}/delete-avatar`, { method: 'POST' })
            const response = await fetch(`${process.env.REACT_APP_SERVER}/partners/${partner._id}`, { method: 'DELETE' })
            if (response.ok) {
                props.onHide()
                setLoading(false);
                getPartners()
            } else {
                setLoading(false);
                setError(true);
            }
        } catch (error) {
            console.error(error)
            setError(true);
            setLoading(false);
        }
    }, [props])

    const handleClose = useCallback(() => {
        setError(false);
        setLoading(false);
        props.onHide();
    }, [props])

    return (
        <Modal {...props} size="sm" centered>
            {error && <Error />}
            <Modal.Body className='d-flex justify-content-center'>
                {
                    loading
                        ? <SmallLoader color='white' />
                        : <h4 className='text-center'>{handleModalDeleteLanguage(language)}</h4>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>{handleModalDeleteNoLanguage(language)}</Button>
                <Button onClick={handleDelete}>{handleModalDeleteYesLanguage(language)}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletePartnerModal