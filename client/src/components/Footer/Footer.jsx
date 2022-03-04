import './style.css'
import { useContext } from 'react';
import { languageContext } from '../../App';
import { Container, Col } from 'react-bootstrap';
import { IoCallOutline, IoLocation } from 'react-icons/io5';
import { AiOutlineMail } from 'react-icons/ai';
import { SiFacebook, SiInstagram } from 'react-icons/si';
import GoogleMaps from '../../utils/GoogleMaps';
import {
    handleFooterAddressLanguage,
    handleFooterCopyrightLanguage,
    handleFooterEmailLanguage,
    handleFooterPhoneLanguage
} from './content';



export default function Footer() {

    const { language } = useContext(languageContext);
    const date = new Date().getFullYear()
    const location = [40.205010, 44.544550]

    return (
        <Container fluid className='main-footer'>
            <div className='footer-map'>
                <GoogleMaps location={location} />
            </div>
            <div className='footer-contact-raw'>
                <Col xs={12} sm={5} md={4} lg={3} className='footer-contact-item' >
                    <div className='footer-contact-item-icon'><IoLocation /></div>
                    {handleFooterAddressLanguage(language)}
                </Col>
                <Col xs={12} sm={5} md={3} lg={3} className='footer-contact-item' >
                    <div className='footer-contact-item-icon'><IoCallOutline /></div>
                    <div className='footer-contact-item-address'>
                        <span>{handleFooterPhoneLanguage(language)}</span>
                        <span>+374-10-242968</span>
                    </div>
                </Col>
                <Col xs={12} sm={5} md={4} lg={3} className='footer-contact-item'>
                    <div className='footer-contact-item-icon'><AiOutlineMail /></div>
                    <div className='footer-contact-item-address'>
                        <span>{handleFooterEmailLanguage(language)}</span>
                        <span>something@something.com</span>
                    </div>
                </Col>
                <Col xs={12} sm={5} md={3} lg={2} className='footer-contact-item-social'>
                    <div><SiFacebook /></div>
                    <div><SiInstagram /></div>
                </Col>
            </div>
            <div className='footer-copyright-info'>
                {handleFooterCopyrightLanguage(language, date)}
            </div>
        </Container >
    );
}


