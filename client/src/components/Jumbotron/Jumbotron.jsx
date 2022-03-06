import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { languageContext } from '../../App';
import cover from '../../Images/homecover.jpeg'
import './style.css'

function Jumbotron() {

    const navigate = useNavigate();
    const { language } = useContext(languageContext);
    const armenian = language === 'am';
    const german = language === 'de';
    const english = language === 'en';


    return (

        <Container fluid className="jumbotron">
            <div className='main-cover'>
                <img src={cover} alt="jumbotron-cover" />
            </div>
            {
                armenian ?
                    <div className='about-us-body'>
                        <h1>Հանուն բարեկեցության</h1>
                        <p>Այստեղ ես ինչ որ տեքստ կլինի</p>
                        <button onClick={() => navigate('about-us')}>Մեր մասին</button>
                    </div> :
                    german ?
                        <div className='about-us-body'>
                            <h1>We know how to make German</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto officia animi illo, quos aliquid aperiam labore cumque quo consequuntur hic?</p>
                            <button onClick={() => navigate('about-us')}>Uber uns</button>
                        </div> :
                        english ?
                            <div className='about-us-body'>
                                <h1>We know how to make Difference</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto officia animi illo, quos aliquid aperiam labore cumque quo consequuntur hic?</p>
                                <button onClick={() => navigate('about-us')}>About Us</button>
                            </div> : null
            }
        </Container>
    )
}

export default Jumbotron;
