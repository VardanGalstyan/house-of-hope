import { useState, useContext, useCallback } from 'react'
import { teamMemberContext } from './Team';
import { Modal, Button } from 'react-bootstrap';
import Error from '../Reusable/Error';
import SmallLoader from '../Reusable/SmallLoader';
import { handleModalDeleteLanguage, handleModalDeleteNoLanguage, handleModalDeleteYesLanguage } from '../News/content';

function MemberDeleteModal({ member, language, ...props }) {

    const getTeam = useContext(teamMemberContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleDelete = useCallback(async () => {
        try {
            setLoading(true);
            member.avatar && await fetch(`${process.env.REACT_APP_SERVER}/teams/${member._id}/delete-avatar`, { method: 'POST' })
            const response = await fetch(`${process.env.REACT_APP_SERVER}/teams/${member._id}`, { method: 'DELETE' })
            if (response.ok) {
                setLoading(false);
                getTeam()
            } else {
                setError(true);
                setLoading(false);
            }
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }, [member, getTeam])

    const handleClose = useCallback(() => {
        setError(false);
        setLoading(false);
        props.onHide();
    }, [props])

    return (
        <Modal {...props} size="sm" centered  >
            {error && <Error />}
            <Modal.Body className='d-flex justify-content-center'>
                {loading
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

export default MemberDeleteModal