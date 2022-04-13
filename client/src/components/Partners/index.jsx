import './style.css'
import { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { IoCreateOutline } from 'react-icons/io5';
import { languageContext, adminContext } from '../../App';
import { handlePartnerHeader } from './content.js';
import NewPartner from './NewPartner/NewPartner';
import NewPartnerModal from './NewPartner/NewPartnerModal';
import Loader from '../Reusable/Loader';
import Error from '../Reusable/Error';

export const getPartnerContext = createContext();

function Partners() {

    const { isAdmin } = useContext(adminContext);
    const { language } = useContext(languageContext);
    const [isMore, setIsMore] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getPartners = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER}/partners`);
            if (response.ok) {
                const data = await response.json();
                setPartners(data)
                setLoading(false)
            } else {
                setError(true)
                setLoading(false)
            }
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }, [])


    useEffect(() => {
        getPartners()

    }, []);


    return (


        <Container fluid className='partners'>
            <getPartnerContext.Provider value={getPartners}>
                <div className='partners-cover-image'>
                    <img src='our-partners.jpg' alt="partners-cover" />
                    <div className='partners-header'>
                        {handlePartnerHeader(language, isMore)}
                        <div className='mobile-button-header'>
                            <button onClick={() => setIsMore(!isMore)}>{isMore ? "Show less..." : "Show More..."}</button>
                        </div>
                    </div>
                </div>
                {
                    isAdmin &&
                    <div className='admin-tools'>
                        <IoCreateOutline onClick={() => setModalShow(true)} />
                        <NewPartnerModal show={modalShow} onHide={() => setModalShow(false)} />
                    </div>
                }
                <div className='partners-body'>
                    {
                        error ? <Error /> :
                            loading ? <Loader /> :
                                partners.map((partner, i) => < NewPartner key={partner._id} partner={partner} admin={isAdmin} language={language} />)
                    }
                </div>
            </getPartnerContext.Provider>
        </Container>

    );
}

export default Partners;
