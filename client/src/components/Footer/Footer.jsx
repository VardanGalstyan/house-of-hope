import React, { useContext } from 'react';
import { languageContext } from '../../App';
import { Container, Col } from 'react-bootstrap';
import { IoCallOutline, IoLocation } from 'react-icons/io5';
import { AiOutlineMail } from 'react-icons/ai';
import { SiFacebook, SiInstagram } from 'react-icons/si';
import GoogleMaps from '../../utils/GoogleMaps';
import './style.css'



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
                    {language === 'am' ?
                        <div className='footer-contact-item-address'>
                            <span>Մեր հասցեն։</span>
                            <span>Դրոյի փող., 22/5 շենք</span>
                            <span>Հայաստան, 0069, Երևան</span>
                        </div> :
                        <div className='footer-contact-item-address'>
                            <span>Unsere Address։</span>
                            <span>Dro straße, 22/5 </span>
                            <span>Armenia, 0069, Erewan</span>
                        </div>
                    }
                </Col>
                <Col xs={12} sm={5} md={3} lg={3} className='footer-contact-item' >
                    <div className='footer-contact-item-icon'><IoCallOutline /></div>
                    <div className='footer-contact-item-address'>
                        <span>{language === 'am' ? 'Զանգահարեք մեզ' : 'Telephone'}</span>
                        <span>+374-10-242968</span>
                    </div>
                </Col>
                <Col xs={12} sm={5} md={4} lg={3} className='footer-contact-item'>
                    <div className='footer-contact-item-icon'><AiOutlineMail /></div>
                    <div className='footer-contact-item-address'>
                        <span>{language === 'am' ? 'Գրեք մեզ' : 'E-mail'}</span>
                        <span>something@something.com</span>
                    </div>
                </Col>
                <Col xs={12} sm={5} md={3} lg={2} className='footer-contact-item-social'>
                    <div><SiFacebook /></div>
                    <div><SiInstagram /></div>
                </Col>
            </div>
            <div className='footer-copyright-info'>
                {
                    language === 'am' ?
                        <span>Հեղինակային իրավունները պատկանում են՝ © {date} House of Hope. Բոլոր իրավունքները պաշտպանված են։</span> :
                        <span>All copyrights belong to © {date} House of Hope. All rights reserved</span>
                }
            </div>
        </Container >
    );
}


