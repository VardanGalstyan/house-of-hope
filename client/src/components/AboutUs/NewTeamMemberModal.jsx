import { useState, useEffect, useContext } from 'react'
import { teamMemberContext } from './Team.jsx';
import { languageContext } from '../../App.js';
import { Modal, Button, Form } from 'react-bootstrap';
import { handleTeamModalHeaderTitleLanguage } from './content.js'
import { handleFormCloseLanguage, handleFormConfirmLanguage } from '../projects/content.js';
import Error from '../Reusable/Error.jsx';
import SmallLoader from '../Reusable/SmallLoader.js';

function NewTeamMemberModal({ member, ...props }) {

    const getTeam = useContext(teamMemberContext);
    const method = member ? 'PUT' : 'POST';
    const endpoint = member ? `${process.env.REACT_APP_SERVER}/teams/${member._id}` : `${process.env.REACT_APP_SERVER}/teams`;

    const initialState = {
        name_am: member ? member.name_am : '',
        name_de: member ? member.name_de : '',
        name_en: member ? member.name_en : '',
        position_am: member ? member.position_am : '',
        position_de: member ? member.position_de : '',
        position_en: member ? member.position_en : '',
        avatar: member ? member.avatar : '',
    }

    const [team, setTeam] = useState(initialState);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { language } = useContext(languageContext);


    const validMemberNameAm = team.name_am.length > 0;
    const validMemberNameDe = team.name_de.length > 0;
    const validMemberNameEn = team.name_en.length > 0;
    const validPositionAm = team.position_am.length > 0;
    const validPositionDe = team.position_de.length > 0;
    const validPositionEn = team.position_en.length > 0;
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
                const response = await fetch(`${process.env.REACT_APP_SERVER}/teams/${data._id}/avatar`, {
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
        <Modal {...props} size="md" centered >
            <Modal.Header closeButton>
                <Modal.Title>{handleTeamModalHeaderTitleLanguage(language)}</Modal.Title>
            </Modal.Header>
            {error && <Error />}
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
                            placeholder="Name"
                            value={team.name_de}
                            onChange={(e) => setTeam({ ...team, name_de: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            isValid={validPositionDe}
                            isInvalid={!validPositionDe}
                            type="text"
                            placeholder="Stellung"
                            value={team.position_de}
                            onChange={(e) => setTeam({ ...team, position_de: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            isValid={validMemberNameEn}
                            isInvalid={!validMemberNameEn}
                            type="text"
                            placeholder="Employee's Name"
                            value={team.name_en}
                            onChange={(e) => setTeam({ ...team, name_en: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            isValid={validPositionEn}
                            isInvalid={!validPositionEn}
                            type="text"
                            placeholder="Position"
                            value={team.position_en}
                            onChange={(e) => setTeam({ ...team, position_en: e.target.value })}
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
                <Button onClick={handleClose}>{handleFormCloseLanguage(language)}</Button>
                {
                    loading
                        ? <SmallLoader color='white' />
                        : <Button
                            type="submit"
                            disabled={!validMemberNameAm || !validMemberNameDe || (!member ? !validAvatar : null) || !validPositionAm || !validPositionDe}
                            onClick={handleSubmit}>{handleFormConfirmLanguage(language)}
                        </Button>

                }
            </Modal.Footer>
        </Modal>
    )
}

export default NewTeamMemberModal