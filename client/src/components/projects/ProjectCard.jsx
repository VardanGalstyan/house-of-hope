import { useContext } from 'react';
import { languageContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { handleReadMoreLanguage } from '../News/content';

function ProjectCard({ project }) {

    const navigate = useNavigate();
    const { title_am, title_en, title_de, description_de, description_am, description_en, cover, _id, createdAt, } = project;


    // L A N G U A G E  C O N T E X T
    const { language } = useContext(languageContext);
    const am = language === 'am';
    const de = language === 'de';
    const en = language === 'en';


    // D A T E  C O N V E R S I O N
    const getDate = createdAt.split('T')[0];
    const date = new Date(getDate);
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();


    return (
        <div className='project-card'>
            <div className='project-card-header'>
                <img src={cover} alt="project-header" />
                <div className='project-create-date'>
                    <span>{`${day} ${month}`}</span>
                    <span>{year}</span>
                </div>
            </div>
            <div className='project-card-body'>
                <h3>{am ? title_am : de ? title_de : en ? title_en : null}</h3>
                <p>{am ? description_am : de ? description_de : en ? description_en : null}</p>
                <div className='project-card-buttons'>
                    <button onClick={() => navigate(`project/${_id}`)}>{handleReadMoreLanguage(language)}</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;
