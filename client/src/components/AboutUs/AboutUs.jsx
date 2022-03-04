import './style.css'
import { Container } from 'react-bootstrap';
import Team from './Team';
import TheStory from './TheStory';


function AboutUs() {
    return (
        <Container fluid className='about-us'>
            <div className='about-us-header'>
                <img src="https://scontent-frx5-1.xx.fbcdn.net/v/t31.18172-8/477175_191192127654116_94945894_o.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=3ISWxGzJ-QgAX-TDRjQ&_nc_ht=scontent-frx5-1.xx&oh=00_AT9Ll3Zb8Vfs5sxsO8yGFFQbjIx4YxEB03cATxRdOPXYUQ&oe=622DE3A6" alt="about-us-cover" />
            </div>
            <div className='about-us-body'>
                <TheStory />
                <Team />
            </div>
        </Container>
    );
}

export default AboutUs;
