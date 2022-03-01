import React, { useState, useContext } from 'react'
import { teamMemberContext } from './Team';
import { Modal, Button } from 'react-bootstrap';
import Error from '../Reusable/Error';
import SmallLoader from '../Reusable/SmallLoader';

function MemberDeleteModal(props) {

    const getTeam = useContext(teamMemberContext);
    const { member } = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://house-of-hope.herokuapp.com/${member._id}`, {
                method: 'DELETE',
            })
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
                        <h4 className='text-center'>Are you sure you want to remove {member.name_de}?</h4>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleDelete}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MemberDeleteModal