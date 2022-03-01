import './style.css';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { languageContext } from '../../App';
import { BsFillArrowRightSquareFill, BsArrowLeftSquareFill } from 'react-icons/bs';
import ProjectCard from './ProjectCard';
import Headers from '../Reusable/Headers';
import { FiCircle } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import { IoCreateOutline } from 'react-icons/io5';
import NewProjects from './NewProjects';
import { Watch } from 'react-loader-spinner';

export const ProjectContext = createContext();

function Projects() {

    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { language } = useContext(languageContext);
    const [current, setCurrent] = useState(0);
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        fetchProjects()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true)
            const response = await fetch('projects')
            if (response.ok) {
                const projectsData = await response.json();
                setProjects(projectsData);
                setLoading(false)
            } else {
                setLoading(false)
                setError(true)
                console.log('error');
            }
        }
        catch (error) {
            setLoading(false)
            setError(true)
            console.log(error);
        }
    }

    const length = projects.length;
    const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
    const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

    return (
        <Container fluid className='projects'>
            <ProjectContext.Provider value={fetchProjects}>
                <div className='admin-options'>
                    <IoCreateOutline onClick={() => setModalShow(true)} />
                    <NewProjects show={modalShow} onHide={() => setModalShow(false)} />
                </div>
                <Headers title={language === 'am' ? 'Մեր Ծրագրերը' : 'Unsere Projekte'} paragraph={language === "am" ? 'ինչ որ տեքստ այստեղ' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rerum.'} />
                {
                    error &&
                    <Alert variant="danger" className='d-flex justify-content-center' >
                        <Alert.Heading>oops! You got an error!</Alert.Heading>
                    </Alert>
                }
                <div className='project-container'>
                    {
                        projects.map((project, index) => index === current && <div key={index} className={index === current ? 'slide-active' : 'slide'}>
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
                        loading ?
                            <Watch
                                height="30"
                                width="30"
                                color='grey'
                                ariaLabel='loading'
                            /> :
                            projects.map((title, index) =>
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

