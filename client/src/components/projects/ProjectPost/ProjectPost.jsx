import React, { useState, useEffect, useContext, createContext } from 'react';
import { languageContext } from '../../../App';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { RiDeleteBin6Fill, RiEdit2Fill } from 'react-icons/ri';
import './style.css'
import Loader from '../../Reusable/Loader';
import Error from '../../Reusable/Error';
import NewProjects from '../NewProjects';
import DeleteProjectModal from './DeleteProjectModal';

export const SingleProjectContext = createContext();

function ProjectPost() {

    const { language } = useContext(languageContext);
    const { id } = useParams();


    const [project, setProject] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    console.log('test');

    const fetchProject = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://house-of-hope.herokuapp.com/projects/${id}`)
            if (response.ok) {
                const data = await response.json();
                setProject(data);
                setLoading(false);
            } else {
                setLoading(false)
                setError(true)
            }
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        fetchProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {error ? <Error /> :
                loading ?
                    <Loader />
                    :
                    <Container fluid className='project-post' >
                        <div className='main-post'>
                            <div className='main-post-header'>
                                <img src={project.cover} alt="project-cover" />
                            </div>
                            <div className='main-post-body'>
                                <h1>{language === 'am' ? project.title_am : project.title_de}</h1>
                                <span> {language === 'am' ? project.description_am : project.description_de} </span>
                            </div>
                            {
                                <div className='main-post-admin-tools'>
                                    <span><RiEdit2Fill onClick={() => setModalShow(true)} /></span>
                                    <span><RiDeleteBin6Fill onClick={() => setDeleteModal(true)} /></span>
                                </div>
                            }
                        </div>
                        <SingleProjectContext.Provider value={fetchProject}>
                            <NewProjects show={modalShow} onHide={() => setModalShow(false)} edited={project} />
                            <DeleteProjectModal show={deleteModal} onHide={() => setDeleteModal(false)} project={project} />
                        </SingleProjectContext.Provider>
                    </Container >
            }
        </>
    )
}

export default ProjectPost;
