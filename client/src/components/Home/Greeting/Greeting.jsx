import './style.css'
import { useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { languageContext } from '../../../App';
import { TiArrowForward, TiArrowBack } from 'react-icons/ti';
import { ContentArm, ContentDe, ContentEn } from './content.js'
import Headers from '../../Reusable/Headers';

function Greeting() {

    const [greeting, setGreeting] = useState(false);
    const { language } = useContext(languageContext);
    const armenian = language === 'am';
    const german = language === 'de';
    const english = language === 'en';

    return (
        <Container fluid className='greeting'>
            <Headers title={armenian ? "Բարի Գալուստ Հուսո Տուն" : german ? "Herzlich Willkommen im Haus der Hoffnung" : english ? "Welcome to House of Hope" : null} />
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
                    <img src='mp.png' alt="greeting-avatar" />
                </div>
                <div className={!greeting ? 'greeting-body' : 'body-active'}>
                    {
                        armenian ? <ContentArm /> :
                            german ? <ContentDe /> :
                                english ? <ContentEn /> : null
                    }
                </div>
            </div>

        </Container>
    );
}

export default Greeting;
