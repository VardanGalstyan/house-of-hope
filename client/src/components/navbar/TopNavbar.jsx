import './navbar.css'
import ls from 'localstorage-slim'
import { useState, useCallback } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'



ls.config.encrypt = true

function TopNavbar({ lang, language }) {


    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const english = language === 'en'
    const german = language === 'de'
    const armenian = language === 'am'

    const handleHomeClick = useCallback((e) => {
        navigate('/')
        setExpanded(false)
    }, [navigate])

    const handleAboutUs = useCallback((e) => {
        navigate('/about-us')
        setExpanded(false)
    }, [navigate])

    const handlePartners = useCallback((e) => {
        navigate('/partners')
        setExpanded(false)
    }, [navigate])

    const handleFontAm = useCallback((e) => {
        lang('am')
        ls.set('language', 'am')
        setExpanded(false)
    }, [lang])

    const handleFontDe = useCallback((e) => {
        lang('de')
        ls.set('language', 'de')
        setExpanded(false)
    }, [lang])

    const handleFontEn = useCallback((e) => {
        lang('en')
        ls.set('language', 'en')
        setExpanded(false)
    }, [lang])

    const changeStyle = useCallback(() => {
        if (window.scrollY >= 50) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }, [])

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
                <Navbar.Brand onClick={handleHomeClick}><img src='logo.png' alt="main-logo" /></Navbar.Brand>
                <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
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
