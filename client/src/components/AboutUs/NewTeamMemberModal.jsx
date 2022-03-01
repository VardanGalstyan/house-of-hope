import React, { useState, useEffect, useContext } from 'react'
import { teamMemberContext } from './Team.jsx';
import { Modal, Button, Form } from 'react-bootstrap';
import Error from '../Reusable/Error.jsx';
import SmallLoader from '../Reusable/SmallLoader.js';

function NewTeamMemberModal(props) {

    const getTeam = useContext(teamMemberContext);
    const { member } = props;
    const method = member ? 'PUT' : 'POST';
    const endpoint = member ? `teams/${member._id}` : 'teams';

    const initialState = {
        name_am: member ? member.name_am : '',
        name_de: member ? member.name_de : '',
        position_am: member ? member.position_am : '',
        position_de: member ? member.position_de : '',
        avatar: member ? member.avatar : '',
    }

    const [team, setTeam] = useState(initialState);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const validMemberNameAm = team.name_am.length > 0;
    const validMemberNameDe = team.name_de.length > 0;
    const validPositionAm = team.position_am.length > 0;
    const validPositionDe = team.position_de.length > 0;
    const validAvatar = image;

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
                body: JSON.stringify(team)
            })
            if (res.ok && image !== null) {
                const data = await res.json()
                const formData = new FormData()
                formData.append('avatar', image)
                const response = await fetch(`teams/${data._id}/avatar`, {
                    body: formData,
                    method: 'POST',
                })
                if (response.ok) {
                    setLoading(false)
                    setTeam(initialState)
                    props.onHide()
                    getTeam()
                } else {
                    setLoading(false)
                    setError(true)
                }
            } else if (res.ok && image === null) {
                setLoading(false)
                setTeam(initialState)
                props.onHide()
                getTeam()
            }
            else {
                setLoading(false)
                setError(true)
            }
        } catch (error) {
            setError(true)
        }
    }

    const handleClose = () => {
        setTeam(initialState);
        setLoading(false);
        setError(false);
        setImage(null);
        props.onHide();
    }

    useEffect(() => {
        setTeam(initialState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [member])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add a team
                </Modal.Title>
            </Modal.Header>
            {
                error && <Error />
            }
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            isValid={validMemberNameAm}
                            isInvalid={!validMemberNameAm}
                            type="text"
                            placeholder="Աշխատակցի անոնը"
                            value={team.name_am}
                            onChange={(e) => setTeam({ ...team, name_am: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            isValid={validPositionAm}
                            isInvalid={!validPositionAm}
                            type="text"
                            placeholder="Պաշտոնը"
                            value={team.position_am}
                            onChange={(e) => setTeam({ ...team, position_am: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            isValid={validMemberNameDe}
                            isInvalid={!validMemberNameDe}
                            type="text"
                            placeholder="Employee's Name"
                            value={team.name_de}
                            onChange={(e) => setTeam({ ...team, name_de: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            isValid={validPositionDe}
                            isInvalid={!validPositionDe}
                            type="text"
                            placeholder="Position"
                            value={team.position_de}
                            onChange={(e) => setTeam({ ...team, position_de: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Control
                            isValid={!member ? validAvatar : false}
                            isInvalid={!member ? !validAvatar : false}
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
                            disabled={!validMemberNameAm || !validMemberNameDe || (!member ? !validAvatar : null) || !validPositionAm || !validPositionDe}
                            onClick={handleSubmit}>Submit
                        </Button>

                }
            </Modal.Footer>
        </Modal>
    )
}

export default NewTeamMemberModal