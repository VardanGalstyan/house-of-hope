import React, { useContext, useState } from 'react';
import { languageContext } from '../../App';
import { Container } from 'react-bootstrap';
import VolunteersModal from './VolunteersModal';
import './style.css'
import { addVolunteerButton, addVolunteerTitle } from './content';

function Volunteer() {

    const [modalShow, setModalShow] = useState(false);
    const { language } = useContext(languageContext);

    return (
        <Container fluid className='volunteers'>
            <div className='volunteers-main'>
                <h1 className='mb-3'>{addVolunteerTitle(language)}</h1>
                <button onClick={() => setModalShow(true)}>{addVolunteerButton(language)}</button>
            </div>
            <VolunteersModal show={modalShow} onHide={() => setModalShow(false)} language={language} />
        </Container>
    );
}

export default Volunteer;
