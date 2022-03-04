import { useState, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { languageContext } from '../../../App';
import Error from '../../Reusable/Error';
import SmallLoader from '../../Reusable/SmallLoader';
import { handleModalDeleteLanguage, handleModalDeleteNoLanguage, handleModalDeleteYesLanguage } from '../content';

function DeleteArticleModal({ article, ...props }) {

    const { language } = useContext(languageContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER}/articles/${article._id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                setLoading(false);
                props.onHide()
                navigate('/')
            } else {
                console.log('error in delete Project')
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
        <Modal {...props} size="sm" centered >
            {error && <Error />}
            <Modal.Body className='d-flex justify-content-center'>
                {loading
                    ? <SmallLoader color='white' />
                    : <h4 className='text-center'>{handleModalDeleteLanguage(language)} </h4>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>{handleModalDeleteNoLanguage(language)}</Button>
                <Button onClick={handleDelete}>{handleModalDeleteYesLanguage(language)}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteArticleModal