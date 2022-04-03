import './style.css'
import { useState, useEffect, useContext, createContext } from 'react';
import { languageContext, adminContext } from '../../../App';
import { RiDeleteBin6Fill, RiEdit2Fill } from 'react-icons/ri';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../../Reusable/Loader';
import Error from '../../Reusable/Error';
import NewProjects from '../NewProjects';
import DeleteProjectModal from './DeleteProjectModal';

export const SingleProjectContext = createContext();

function ProjectPost() {

    const { isAdmin } = useContext(adminContext);
    const { id } = useParams();
    const { language } = useContext(languageContext);

    const am = language === 'am';
    const de = language === 'de';
    const en = language === 'en';

    const [project, setProject] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { title_am, title_de, title_en, description_am, description_de, description_en, } = project;


    const fetchProject = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER}/projects/${id}`)
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
                                <img src={project?.cover?.url} alt="project-cover" />
                            </div>
                            <div className='main-post-body'>
                                <h1>{am ? title_am : de ? title_de : en ? title_en : null}</h1>
                                <span> {am ? description_am : de ? description_de : en ? description_en : null} </span>
                            </div>
                            {
                                isAdmin &&
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
