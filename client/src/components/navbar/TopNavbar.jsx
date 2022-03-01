import './navbar.css'
import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function TopNavbar({ lang, language }) {


    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(true);
    const [navbar, setNavbar] = useState(false);

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
        setExpanded(false)
    }

    const handleFontDe = (e) => {
        lang('de')
        setExpanded(false)
    }

    const changeStyle = () => {
        if (window.scrollY >= 60) {
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
                <Navbar.Brand onClick={handleHomeClick}><img src={require('../../Images/logo6.png')} alt="main-logo" /></Navbar.Brand>
                <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {
                            language === 'am' ?
                                <>
                                    <Nav.Link onClick={handlePartners}>Մենք Երախտապարտ ենք</Nav.Link>
                                    <Nav.Link onClick={handleAboutUs}>Մեր Մասին</Nav.Link>
                                </> :
                                <>
                                    <Nav.Link onClick={handlePartners}>Wir sind dankbar</Nav.Link>
                                    <Nav.Link onClick={handleAboutUs}>Über uns</Nav.Link>
                                </>
                        }
                    </Nav>
                    <Nav className='languages'>
                        <span onClick={handleFontAm}>ՀԱՅ |</span>
                        <span onClick={handleFontDe}>DE</span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNavbar;
