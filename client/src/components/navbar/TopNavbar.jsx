import './navbar.css'
import { useState } from 'react';
import ls from 'localstorage-slim'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import logo from '../../Images/logo6.png'


ls.config.encrypt = true

function TopNavbar({ lang, language }) {


    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [navbar, setNavbar] = useState(false);
    const english = language === 'en'
    const german = language === 'de'
    const armenian = language === 'am'

    const handleHomeClick = (e) => {
        navigate('/')
        setExpanded(false)
    }

    const handleAboutUs = (e) => {
        navigate('/about-us')
        setExpanded(false)
    }

    const handlePartners = (e) => {
        navigate('/partners')
        setExpanded(false)
    }

    const handleFontAm = (e) => {
        lang('am')
        ls.set('language', 'am')
        setExpanded(false)
    }

    const handleFontDe = (e) => {
        lang('de')
        ls.set('language', 'de')
        setExpanded(false)
    }

    const handleFontEn = (e) => {
        lang('en')
        ls.set('language', 'en')
        setExpanded(false)
    }

    const changeStyle = () => {
        if (window.scrollY >= 50) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', changeStyle);


    return (
        <Navbar
            className={!navbar ? 'navbar-fixed-top navbar' : 'navbar-static-top navbar'}
            collapseOnSelect={true}
            expand="lg"
            variant='dark'
            expanded={expanded}
        >
            <Container fluid='md'>
                <Navbar.Brand onClick={handleHomeClick}><img src={logo} alt="main-logo" /></Navbar.Brand>
                <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={handlePartners}>
                            {english ? "We are Grateful" : german ? "Wir sind dankbar" : armenian ? "Մենք Երախտապարտ ենք" : null}
                        </Nav.Link>
                        <Nav.Link onClick={handleAboutUs}>
                            {english ? "About us" : german ? "Über uns" : armenian ? "Մեր Մասին" : null}
                        </Nav.Link>
                    </Nav>
                    <Nav className='languages'>
                        <span onClick={handleFontAm}>ՀԱՅ |</span>
                        <span onClick={handleFontDe}>DE |</span>
                        <span onClick={handleFontEn}>EN</span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default TopNavbar;
