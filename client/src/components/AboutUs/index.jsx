import './style.css'
import { Container } from 'react-bootstrap';
import Team from './Team';
import TheStory from './TheStory';



function AboutUs() {
    return (
        <Container fluid className='about-us'>
            <div className='about-us-header'>
                <img src='our-story.jpg' alt="about-us-cover" />
            </div>
            <div className='about-us-body'>
                <TheStory />
                <Team />
            </div>
        </Container>
    );
}

export default AboutUs;
