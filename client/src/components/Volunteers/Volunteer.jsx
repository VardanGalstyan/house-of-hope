import React, { useContext, useState } from 'react';
import { languageContext } from '../../App';
import { Container } from 'react-bootstrap';
import VolunteersModal from './VolunteersModal';
import './style.css'

function Volunteer() {

    const [modalShow, setModalShow] = useState(false);
    const { language } = useContext(languageContext);

    return (
        <Container fluid className='volunteers'>
            <div className='volunteers-main'>
                {
                    language === 'am' ?
                        <>
                            <h1>Դառնալ Կամավոր</h1>
                            <p>Ինչ որ տեքստ այստեղ</p>
                            <button onClick={() => setModalShow(true)}>Միացիր հիմա</button>
                        </> :
                        <>
                            <h1>Become a Proud Volunteer Now</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rerum.</p>
                            <button onClick={() => setModalShow(true)}>Join Now</button>
                        </>
                }
            </div>
            <VolunteersModal show={modalShow} onHide={() => setModalShow(false)} language={language} />
        </Container>
    );
}

export default Volunteer;
