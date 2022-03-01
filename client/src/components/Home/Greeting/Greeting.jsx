import './style.css'
import { useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { languageContext } from '../../../App';
import { TiArrowForward, TiArrowBack } from 'react-icons/ti';
import { ContentArm, ContentDe } from './content.js'
import Headers from '../../Reusable/Headers';

function Greeting() {

    const [greeting, setGreeting] = useState(false);
    const { language } = useContext(languageContext);

    return (
        <Container fluid className='greeting'>
            <Headers title={language === "am" ? "Բարի Գալուստ Հուսո Տուն" : "Herzlich Willkommen im Haus der Hoffnung"} />
            < div className='greetings-content'>
                {!greeting ?
                    <div
                        onClick={() => setGreeting(!greeting)}
                        className='mobile-content'><TiArrowForward />
                    </div> :
                    <div
                        onClick={() => setGreeting(!greeting)}
                        className='mobile-content-back'><TiArrowBack />
                    </div>
                }
                <div className={!greeting ? 'greeting-header' : 'header-active'}>
                    <img src={require("../../../Images/mp.png")} alt="greeting-avatar" />
                </div>
                <div className={!greeting ? 'greeting-body' : 'body-active'}>
                    {
                        language === 'am' ?
                            <ContentArm /> : <ContentDe />
                    }
                </div>
            </div>

        </Container>
    );
}

export default Greeting;
