import React, { useState, useContext, useEffect } from 'react';
import { SingleProjectContext } from './ProjectPost/ProjectPost';
import { languageContext } from '../../App';
import { Modal, Form, Button } from 'react-bootstrap';
import SmallLoader from '../Reusable/SmallLoader.js';
import Error from '../Reusable/Error';

function NewProjects(props) {

    const { edited } = props;
    const endpoint = edited ? `https://house-of-hope.herokuapp.com/projects/${edited._id}` : 'https://house-of-hope.herokuapp.com/projects';
    const method = edited ? 'PUT' : 'POST';

    const initialState = {
        title_am: edited ? edited.title_am : '',
        description_am: edited ? edited.description_am : '',
        title_de: edited ? edited.title_de : '',
        description_de: edited ? edited.description_de : '',
        cover: edited ? edited.cover : '',
    }

    const fetchProject = useContext(SingleProjectContext);
    const lang = useContext(languageContext).language;
    const [language, setLanguage] = useState('ARM');
    const [project, setProject] = useState(initialState);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const armenian = language === 'ARM';


    const validTitleAm = project && project.title_am
    const validTitleDe = project && project.title_de
    const validDescriptionAm = project && project.description_am
    const validDescriptionDe = project && project.description_de
    const validPictures = image;


    useEffect(() => {
        setProject(initialState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edited])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(project)
            })
            if (res.ok && image !== null) {
                const data = await res.json();
                const formData = new FormData()
                formData.append('cover', image)
                const response = await fetch(`https://house-of-hope.herokuapp.com/projects/${data._id}/cover`, {
                    body: formData,
                    method: 'POST',
                })
                if (response.ok) {
                    setLoading(false);
                    props.onHide();
                    edited && fetchProject();
                    !edited && setProject(initialState);
                } else {
                    console.log(error);
                    setLoading(false);
                    setError(true);
                }

            } else if (res.ok && image === null) {
                setLoading(false);
                !edited && setProject(initialState);
                props.onHide();
                edited && fetchProject();

            } else {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }

    const handleClose = () => {
        setProject(initialState);
        props.onHide();
        setImage(null);
        setError(false);
        setLoading(false);
    }

    return (
        <Modal  {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title>
                    {lang === 'am' ? 'Նոր Նախագիծ' : 'Neue Projekt'}
                </Modal.Title>
            </Modal.Header>
            {error && <Error />}
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {armenian ?
                        <>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    isValid={validTitleAm}
                                    isInvalid={!validTitleAm}
                                    type="text"
                                    placeholder="Enter the Title"
                                    value={project.title_am}
                                    onChange={(e) => setProject({ ...project, title_am: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control
                                    isValid={validDescriptionAm}
                                    isInvalid={!validDescriptionAm}
                                    as="textarea"
                                    rows={3}
                                    value={project.description_am}
                                    onChange={(e) => setProject({ ...project, description_am: e.target.value })}
                                />
                            </Form.Group>
                        </>
                        :
                        <>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    isValid={validTitleDe}
                                    isInvalid={!validTitleDe}
                                    type="text"
                                    placeholder="Enter the Title"
                                    value={project.title_de}
                                    onChange={(e) => setProject({ ...project, title_de: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control
                                    isValid={validDescriptionDe}
                                    isInvalid={!validDescriptionDe}
                                    as="textarea"
                                    rows={3}
                                    value={project.description_de}
                                    onChange={(e) => setProject({ ...project, description_de: e.target.value })}
                                />
                            </Form.Group>
                        </>
                    }
                    <Form.Group >
                        <Form.Label>{armenian ? "Ավելացնել Նկարներ" : 'Add Images'}</Form.Label>
                        <Form.Control
                            isValid={edited ? " " : validPictures}
                            isInvalid={edited ? '' : !validPictures}
                            type="file"
                            size="sm"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Form.Group>
                </Form>
                <div className='selected-language'>
                    <span
                        onClick={() => setLanguage('ARM')}
                        className={armenian ? 'selected' : ''}
                    >ՀԱՅ</span>|
                    <span
                        onClick={() => setLanguage('DE')}
                        className={armenian ? '' : 'selected'}
                    >DE</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>Close</button>
                {
                    loading ?
                        <SmallLoader color='white' /> :
                        <Button
                            type="submit"
                            disabled={(edited ? null : !validPictures) || !validTitleAm || !validTitleDe || !validDescriptionAm || !validDescriptionDe}
                            onClick={handleSubmit}>Submit
                        </Button>

                }
            </Modal.Footer>
        </Modal >
    );
}

export default NewProjects;
