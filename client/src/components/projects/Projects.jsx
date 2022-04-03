import './style.css';
import { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { languageContext, adminContext } from '../../App';
import { BsFillArrowRightSquareFill, BsArrowLeftSquareFill } from 'react-icons/bs';
import { handleProjectHeaderLanguage } from './content';
import { IoCreateOutline } from 'react-icons/io5';
import { FiCircle } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import { Watch } from 'react-loader-spinner';
import ProjectCard from './ProjectCard';
import Error from '../Reusable/Error';
import NewProjects from './NewProjects';
import Headers from '../Reusable/Headers';

export const ProjectContext = createContext();

function Projects() {

    const { isAdmin } = useContext(adminContext);
    const { language } = useContext(languageContext);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [current, setCurrent] = useState(0);
    const [projects, setProjects] = useState([]);



    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(`${process.env.REACT_APP_SERVER}/projects`)
            if (response.ok) {
                const projectsData = await response.json();
                setProjects(projectsData);
                setLoading(false)
            } else {
                setLoading(false)
                setError(true)
            }
        }
        catch (error) {
            setLoading(false)
            setError(true)
            console.error(error);
        }
    }, [])

    useEffect(() => {
        fetchProjects()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const length = projects.length;
    const nextSlide = useCallback(() => setCurrent(current === length - 1 ? 0 : current + 1), [current, length]);
    const prevSlide = useCallback(() => setCurrent(current === 0 ? length - 1 : current - 1), [current, length]);

    return (
        <Container fluid className='projects'>
            <ProjectContext.Provider value={fetchProjects}>
                {
                    isAdmin &&
                    < div className='admin-options'>
                        <IoCreateOutline onClick={() => setModalShow(true)} />
                        <NewProjects show={modalShow} onHide={() => setModalShow(false)} />
                    </div>
                }
                <Headers
                    title={handleProjectHeaderLanguage(language)} />
                {error && <Error />}
                <div className='project-container'>
                    {
                        projects.map((project, index) =>
                            index === current &&
                            <div key={index}
                                className={index === current ? 'slide-active' : 'slide'}>
                                <ProjectCard project={project} />
                            </div>)
                    }
                    <div className='project-switch'>
                        <span onClick={prevSlide}><BsArrowLeftSquareFill /></span>
                        <span onClick={nextSlide}><BsFillArrowRightSquareFill /></span>
                    </div>
                </div>
                <div className='project-indicators'>
                    {
                        loading
                            ? <Watch height="30" width="30" color='grey' ariaLabel='loading' />
                            : projects.map((index) =>
                                <span key={index} onClick={() => setCurrent(index)}>
                                    {index !== current ? <FiCircle /> : <FaCircle />}
                                </span>)
                    }
                </div>
            </ProjectContext.Provider>
        </Container >
    )
}

export default Projects;

