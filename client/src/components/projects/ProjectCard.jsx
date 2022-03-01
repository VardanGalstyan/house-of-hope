import React, { useContext } from 'react';
import { languageContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function ProjectCard({ project }) {

    const navigate = useNavigate();
    const { language } = useContext(languageContext);


    const getDate = project.createdAt.split('T')[0];
    const date = new Date(getDate);
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();


    return (
        <div className='project-card'>
            <div className='project-card-header'>
                <img src={project.cover} alt="project-header" />
                <div className='project-create-date'>
                    <span>{`${day} ${month}`}</span>
                    <span>{year}</span>
                </div>
            </div>
            <div className='project-card-body'>
                {
                    language === 'am' ?
                        <>
                            <h3>{project.title_am}</h3>
                            <p>{project.description_am}</p>
                            <div className='project-card-buttons'>
                                <button onClick={() => navigate(`project/${project._id}`)}>Կարդալ ավելին</button>
                            </div>
                        </> :
                        <>
                            <h3>{project.title_de}</h3>
                            <p>{project.description_de}</p>
                            <div className='project-card-buttons'>
                                <button onClick={() => navigate(`project/${project._id}`)}>Read More</button>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default ProjectCard;
