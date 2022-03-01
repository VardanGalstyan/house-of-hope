import './style.css'
import { useState, useEffect, useContext, createContext } from 'react';
import { languageContext } from '../../App';
import { Container, Alert } from 'react-bootstrap';
import { IoCreateOutline } from 'react-icons/io5';
import NewPartner from './NewPartner/NewPartner';
import NewPartnerModal from './NewPartner/NewPartnerModal';
import Loader from '../Reusable/Loader';
import { MdError } from 'react-icons/md'

export const getPartnerContext = createContext();

function Partners() {

    const [isMore, setIsMore] = useState(false);
    const { language } = useContext(languageContext);
    const [modalShow, setModalShow] = useState(false);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getPartners = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://house-of-hope.herokuapp.com/partners');
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
    }


    useEffect(() => {
        getPartners()
    }, []);


    return (


        <Container fluid className='partners'>
            <getPartnerContext.Provider value={getPartners}>
                <div className='partners-cover-image'>
                    <img src={require('../../Images/our-partners.jpg')} alt="partners-cover" />
                    <div className='partners-header'>
                        {language === 'am' ?
                            <>
                                <h1>Մենք Երախտապարտ ենք</h1>
                                <p className={isMore ? 'partners-header-show-more' : 'partners-header-show-less'}>
                                    «Գթության խոհանոց» ծրագրի ստեղծման օրվանից հետո բազմաթիվ գերմանացի և հայ գթասիրտ մարդիկ հավաքվեցին մեկ գաղափարի շուրջ, այն է՝ օգնել կարիքավորներին՝ թոթափելու սոցիալական լարվածությունը և ապրելու արժանավայել կյանքով: Այս աննկարագրելի աջակցությունը, որը շարունակվում է մինչ օրս, միշտ կմնա այն մարդկանց սրտերում, ովքեր իրենց դժվարին պահերին զգացել են մեր նվիրատուների գթասրտությունը:
                                    <br />
                                    <br />
                                    Մենք երախտապարտ ենք բոլոր նրանց, ովքեր տարիներ շարունակ իրենց ներդրումն են ունեցել մարդասիրական այս մեծ գաղափարի իրագործման մեջ:
                                    <br />
                                    <br />
                                    Շնորհակալություն ենք հայտնում՝
                                </p>
                            </> :
                            <>
                                <h1>Wir sind dankbar</h1>
                                <p className={isMore ? 'partners-header-show-more' : 'partners-header-show-less'}>
                                    Wir sind dankbar
                                    Erst nach dem Gründungstag des Projektes ’’Küche der Barmehrzigkeit’’ versammelten sich zahlreiche armenische und deutsche gutherzige Menschen um eine Idee, die das Ziel hatte, den Bedürftigen zu helfen, die soziale Schwierigkeiten zu überwinden und ein würdiges Leben zu verbringen. Diese unschätzbare Unterstützung, die bis heute fortgesetzt wird, wird immer in den Herzen diejeniger Menschen bleiben, die in ihren schwierigen Situationen die Barmherzigkeit inserer Spenderinnen und Spender gefühlt haben.
                                    <br />
                                    <br />
                                    Wir sind bei allen dankbar, die seit Jahren ihren Einsatz bei der Erfüllung dieser großen humanitären Idee gehabt haben.
                                    <br />
                                    <br />
                                    Wir bedanken uns herzlich an:
                                </p>
                            </>
                        }
                        <div className='mobile-button-header'>
                            <button onClick={() => setIsMore(!isMore)}>{isMore ? "Show less..." : "Show More..."}</button>
                        </div>
                    </div>
                </div>
                <div className='admin-tools'>
                    <IoCreateOutline onClick={() => setModalShow(true)} />
                    <NewPartnerModal show={modalShow} onHide={() => setModalShow(false)} />
                </div>
                <div className='partners-body'>
                    {
                        error ?
                            <Alert variant="danger" className='d-flex justify-content-center' >
                                <Alert.Heading><MdError /> oops! You got an error!</Alert.Heading>
                            </Alert> :
                            loading ? <Loader /> :
                                partners.map((partner, i) => < NewPartner key={partner._id} partner={partner} />)
                    }
                </div>
            </getPartnerContext.Provider>
        </Container>

    );
}

export default Partners;
