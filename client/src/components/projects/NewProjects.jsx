import { useState, useContext, useEffect } from 'react';
import { languageContext } from '../../App';
import { ProjectContext } from './Projects';
import { SingleProjectContext } from './ProjectPost/ProjectPost';
import { Modal, Form, Button } from 'react-bootstrap';
import {
    handleTitleNameLanguage,
    handleFormContentLanguage,
    handleFormImageLanguage,
    handleFormNameLanguage,
    handleFormConfirmLanguage,
    handleFormCloseLanguage,
} from './content';
import SmallLoader from '../Reusable/SmallLoader.js';
import Error from '../Reusable/Error';

function NewProjects(props) {

    const { edited } = props;
    const endpoint = edited ? `${process.env.REACT_APP_SERVER}/projects/${edited._id}` : `${process.env.REACT_APP_SERVER}/projects`;
    const method = edited ? 'PUT' : 'POST';

    const initialState = {
        title_am: edited ? edited.title_am : '',
        description_am: edited ? edited.description_am : '',
        title_de: edited ? edited.title_de : '',
        description_de: edited ? edited.description_de : '',
        title_en: edited ? edited.title_en : '',
        description_en: edited ? edited.description_en : '',
        cover: edited ? edited.cover : '',
    }

    const fetchProjects = useContext(ProjectContext);
    const fetchProject = useContext(SingleProjectContext);
    const lang = useContext(languageContext).language;
    const [language, setLanguage] = useState('ARM');
    const [project, setProject] = useState(initialState);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const arm = language === 'ARM';
    const de = language === 'DE';
    const en = language === 'EN';



    const validTitleAm = project && project.title_am
    const validTitleDe = project && project.title_de
    const validTitleEn = project && project.title_en
    const validDescriptionAm = project && project.description_am
    const validDescriptionDe = project && project.description_de
    const validDescriptionEn = project && project.description_en
    const validPictures = image;


    useEffect(() => {
        setProject(initialState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edited])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const projectApi = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(project)
            })
            if (projectApi.ok && image !== null) {
                const data = await projectApi.json();
                const formData = new FormData()
                formData.append('cover', image)
                project.cover.url && await fetch(`${process.env.REACT_APP_SERVER}/projects/${data._id}/delete-cover`, { method: 'POST' })
                const addCloudinary = await fetch(`${process.env.REACT_APP_SERVER}/projects/${data._id}/cover`, { body: formData, method: 'POST' })
                if (addCloudinary.ok) {
                    setLoading(false);
                    props.onHide();
                    !edited && setProject(initialState);
                    !edited && fetchProjects();
                } else {
                    console.log(error);
                    setLoading(false);
                    setError(true);
                }

            } else if (projectApi.ok && image === null) {
                setLoading(false);
                edited && fetchProject();
                !edited && setProject(initialState);
                props.onHide();


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
        <Modal  {...props} size="lg" centered >
            <Modal.Header closeButton>
                <Modal.Title>
                    {handleTitleNameLanguage(lang)}
                </Modal.Title>
            </Modal.Header>
            {error && <Error />}
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {arm ?
                        <>
                            <Form.Group>
                                <Form.Label>{handleFormNameLanguage(lang)}</Form.Label>
                                <Form.Control
                                    isValid={validTitleAm}
                                    isInvalid={!validTitleAm}
                                    type="text"
                                    placeholder="Մուտքագրեք նախագծի անվանումը"
                                    value={project.title_am}
                                    onChange={(e) => setProject({ ...project, title_am: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>{handleFormContentLanguage(lang)}</Form.Label>
                                <Form.Control
                                    isValid={validDescriptionAm}
                                    isInvalid={!validDescriptionAm}
                                    as="textarea"
                                    rows={3}
                                    value={project.description_am}
                                    onChange={(e) => setProject({ ...project, description_am: e.target.value })}
                                />
                            </Form.Group>
                        </> :
                        de ?
                            <>
                                <Form.Group>
                                    <Form.Label>{handleFormNameLanguage(lang)}</Form.Label>
                                    <Form.Control
                                        isValid={validTitleDe}
                                        isInvalid={!validTitleDe}
                                        type="text"
                                        placeholder="Name des Projektes"
                                        value={project.title_de}
                                        onChange={(e) => setProject({ ...project, title_de: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>{handleFormContentLanguage(lang)}</Form.Label>
                                    <Form.Control
                                        isValid={validDescriptionDe}
                                        isInvalid={!validDescriptionDe}
                                        as="textarea"
                                        rows={3}
                                        value={project.description_de}
                                        onChange={(e) => setProject({ ...project, description_de: e.target.value })}
                                    />
                                </Form.Group>
                            </> :
                            en ?
                                <>
                                    <Form.Group>
                                        <Form.Label>{handleFormNameLanguage(lang)}</Form.Label>
                                        <Form.Control
                                            isValid={validTitleEn}
                                            isInvalid={!validTitleEn}
                                            type="text"
                                            placeholder="Enter the Title"
                                            value={project.title_en}
                                            onChange={(e) => setProject({ ...project, title_en: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>{handleFormContentLanguage(lang)}</Form.Label>
                                        <Form.Control
                                            isValid={validDescriptionEn}
                                            isInvalid={!validDescriptionEn}
                                            as="textarea"
                                            rows={3}
                                            value={project.description_en}
                                            onChange={(e) => setProject({ ...project, description_en: e.target.value })}
                                        />
                                    </Form.Group>
                                </> : null
                    }
                    <Form.Group >
                        <Form.Label>{handleFormImageLanguage(lang)}</Form.Label>
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
                        className={arm ? 'selected' : ''}
                    >ՀԱՅ</span>|
                    <span
                        onClick={() => setLanguage('DE')}
                        className={de ? 'selected' : ''}
                    >DE</span> |
                    <span
                        onClick={() => setLanguage('EN')}
                        className={en ? 'selected' : ''}
                    >EN</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>{handleFormCloseLanguage(lang)}</button>
                {
                    loading ?
                        <SmallLoader color='white' /> :
                        <Button
                            type="submit"
                            disabled={(edited ? null : !validPictures) || !validTitleAm || !validTitleDe || !validDescriptionAm || !validDescriptionDe}
                            onClick={handleSubmit}>{handleFormConfirmLanguage(lang)}
                        </Button>

                }
            </Modal.Footer>
        </Modal >
    );
}

export default NewProjects;
